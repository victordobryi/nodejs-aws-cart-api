import { Module } from '@nestjs/common';
import { OrderModule } from '../order/order.module';
import { CartController } from './cart.controller';
import { CartService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/entities/carts.entity';
import { CartItem } from 'src/entities/cart_items.entity';
import { User } from 'src/entities/users.entity';
import { Product } from 'src/entities/products.entity';

@Module({
  imports: [
    OrderModule,
    TypeOrmModule.forFeature([Cart, CartItem, User, Product]),
  ],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
