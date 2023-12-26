import { Entity, ManyToOne, JoinColumn, Column, PrimaryColumn } from 'typeorm';
import { Cart } from './carts.entity';
import { Product } from './products.entity';

@Entity({ name: 'cart_items' })
export class CartItem {
  @PrimaryColumn({ type: 'uuid', nullable: false })
  cart_id: string;

  @ManyToOne(() => Cart, (cart) => cart.items)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @PrimaryColumn({ type: 'uuid', nullable: false })
  product_id: string;

  @ManyToOne(() => Product, (product) => product.cartItems)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  count: number;
}
