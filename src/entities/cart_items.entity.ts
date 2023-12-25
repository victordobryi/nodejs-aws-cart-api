import { Entity, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Cart } from './carts.entity';
import { Product } from './products.entity';

@Entity()
export class CartItem {
  @Column({ type: 'uuid', nullable: false })
  cart_id: string;

  @ManyToOne(() => Cart, (cart) => cart.items)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @Column('uuid')
  product_id: string;

  @ManyToOne(() => Product, (product) => product.cartItems)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  count: number;
}
