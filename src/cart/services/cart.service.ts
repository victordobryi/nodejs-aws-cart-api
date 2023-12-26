import { Injectable, NotFoundException } from '@nestjs/common';

import { v4 } from 'uuid';

import { Cart, CartStatuses } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart as CartEntity } from 'src/entities/carts.entity';
import { Repository } from 'typeorm';
import { CartItem } from 'src/entities/cart_items.entity';

@Injectable()
export class CartService {
  @InjectRepository(CartEntity)
  private userCarts: Repository<CartEntity>;

  @InjectRepository(CartItem)
  private userCartsItems: Repository<CartItem>;

  async findByUserId(userId: string) {
    const cart = await this.userCarts.findOne({
      where: { user_id: userId },
    });

    if (!cart) throw new NotFoundException('Cart not found');

    return cart;
  }

  async createByUserId(userId: string) {
    const id = v4();
    const now = new Date().toDateString();

    const userCart = {
      id,
      user_id: userId,
      created_at: now,
      updated_at: now,
      status: CartStatuses.OPEN,
    };

    this.userCarts[userId] = userCart;

    await this.userCarts.insert(userCart);
    return { ...userCart, items: [] };
  }

  async findOrCreateByUserId(userId: string) {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: Cart) {
    const { id, ...rest } = await this.findOrCreateByUserId(userId);

    const updatedCart = {
      id,
      ...rest,
      items: [...items],
    };

    await this.userCarts.save(updatedCart);

    return { ...updatedCart };
  }

  async removeByUserId(userId: string) {
    await this.userCarts.delete({ user_id: userId });
  }

  async findCartById(cartId: string) {
    const cart = await this.userCarts.findOne({
      where: { id: cartId },
    });

    if (!cart) throw new NotFoundException('Cart not found');

    return cart;
  }

  async updateCartItemsCount(
    cart_id: string,
    product_id: string,
    count: number,
  ) {
    if (count <= 0) {
      await this.userCartsItems.delete({ cart_id, product_id });
    } else {
      await this.userCartsItems.update({ cart_id, product_id }, { count });
    }

    const updatedCart = await this.findCartById(cart_id);

    return updatedCart;
  }

  async addProductToCart(user_id: string, product_id: string, count: number) {
    const cart = await this.findOrCreateByUserId(user_id);

    await this.userCartsItems.insert({
      cart_id: cart.id,
      product_id,
      count,
    });

    const updatedCart = await this.findCartById(cart.id);

    return updatedCart;
  }
}
