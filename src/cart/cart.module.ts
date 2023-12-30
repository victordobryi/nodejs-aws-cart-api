import { Module } from '@nestjs/common';
import { OrderModule } from '../order/order.module';
import { CartController } from './cart.controller';
import { CartService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../entities/carts.entity';
import { CartItem } from '../entities/cart_items.entity';
import { User } from '../entities/users.entity';
import { Product } from '../entities/products.entity';

@Module({
  imports: [
    OrderModule,
    TypeOrmModule.forFeature([Cart, CartItem, User, Product]),
  ],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
