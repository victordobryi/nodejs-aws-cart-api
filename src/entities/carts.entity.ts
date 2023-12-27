import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { CartItem } from './cart_items.entity';
import { Order } from './orders.entity';

@Entity({ name: 'carts' })
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { nullable: false })
  user_id: string;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;

  @Column({ enum: ['OPEN', 'ORDERED'] })
  status: string;

  @OneToMany(() => CartItem, (cartItems) => cartItems.cart)
  @JoinColumn({ name: 'id' })
  items: CartItem[];

  @OneToMany(() => Order, (cartItems) => cartItems.cart)
  @JoinColumn({ name: 'id' })
  orders: Order[];
}
