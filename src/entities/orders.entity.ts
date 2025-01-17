import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Delivery, Payment } from '../order/models';
import { Cart } from './carts.entity';
import { User } from './users.entity';
import { CartItem } from './cart_items.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  cart_id: string;

  @Column({ type: 'jsonb' })
  payment: Payment;

  @Column({ type: 'jsonb' })
  delivery: Delivery;

  @Column()
  comments: string;

  @Column()
  status: string;

  @Column()
  total: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Cart, (cart) => cart.orders)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @OneToMany(() => CartItem, (cartItem) => cartItem.order)
  @JoinColumn({ name: 'cart_id' })
  items: CartItem[];
}
