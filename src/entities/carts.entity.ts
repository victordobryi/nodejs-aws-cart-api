import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CartItem } from './cart_items.entity';
import { User } from './users.entity';
import { Order } from './orders.entity';

@Entity({ name: 'carts' })
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { nullable: false })
  user_id: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ enum: ['OPEN', 'ORDERED'] })
  status: string;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  @JoinColumn({ name: 'id' })
  items: CartItem[];

  @OneToMany(() => Order, (cartItems) => cartItems.cart)
  @JoinColumn({ name: 'id' })
  orders: Order[];
}
