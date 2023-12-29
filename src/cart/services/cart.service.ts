import { v4 } from 'uuid';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Cart as CartEntity } from '../../entities/carts.entity';
import { CartItem as CartItemEntity } from '../../entities/cart_items.entity';
import { Cart, CartStatuses } from '../models';

@Injectable()
export class CartService {
  @InjectRepository(CartEntity)
  private cart: Repository<CartEntity>;

  @InjectRepository(CartItemEntity)
  private cartItems: Repository<CartItemEntity>;

  async findCartById(cartId: string) {
    try {
      const cart = await this.cart.findOne({
        where: { id: cartId },
        relations: ['items', 'items.product'],
      });

      if (!cart) throw new NotFoundException('Cart not found');

      return { ...cart };
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async findByUserId(userId: string) {
    try {
      const cart = await this.cart.findOne({
        where: { user_id: userId },
        relations: ['items', 'items.product'],
      });

      if (!cart) throw new NotFoundException('Cart not found');

      return { ...cart };
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async createByUserId(userId: string) {
    const id = v4();
    const userCart = {
      id,
      user_id: userId,
      created_at: new Date().toDateString(),
      updated_at: new Date().toDateString(),
      status: CartStatuses.OPEN,
    };

    await this.cart.insert(userCart);
    return { ...userCart, items: [] };
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);
    if (userCart) {
      return userCart as Cart;
    }

    return await this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: Cart): Promise<Cart> {
    const { id, ...rest } = await this.findOrCreateByUserId(userId);

    const updatedCart = {
      id,
      ...rest,
      items: [...items],
    };

    await this.cart.save(updatedCart);

    return { ...updatedCart };
  }

  async removeByUserId(userId) {
    await this.cart.delete({ user_id: userId });
  }

  async updateCartItemCount(
    cart_id: string,
    product_id: string,
    count: number,
  ) {
    if (count <= 0) {
      await this.cartItems.delete({ cart_id, product_id });
    } else {
      await this.cartItems.update({ cart_id, product_id }, { count });
    }

    const updatedCart = await this.findCartById(cart_id);
    return updatedCart;
  }

  async addProductToCart(user_id: string, product_id: string, count: number) {
    console.log(user_id, 'userId', product_id, 'product_id', count, 'count')
    const cart = await this.findOrCreateByUserId(user_id);

    await this.cartItems.insert({
      cart_id: cart.id,
      product_id,
      count,
    });

    const updatedCart = await this.findCartById(cart.id);
    return updatedCart;
  }
}
