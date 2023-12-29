import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

import { CartItem as CartItemEntity } from './cart_items.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  count: number;

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.product)
  @JoinColumn({ name: 'id' })
  cartItems: CartItemEntity[];
}
