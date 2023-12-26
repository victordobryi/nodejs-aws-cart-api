import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';

import { Order } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import { Order as OrderEntity } from 'src/entities/orders.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orders: Repository<OrderEntity>,
  ) {}

  async findById(orderId: string) {
    const order = await this.orders.findOne({
      where: { id: orderId },
    });

    if (!order) throw new NotFoundException('Order not found');

    return order;
  }

  async create(data: any) {
    const id = v4();
    const order = {
      ...data,
      id,
      status: 'inProgress',
    };

    await this.orders.insert(order);

    return order;
  }

  async update(orderId: string, data: any) {
    const order = await this.findById(orderId);

    const updatedOrder = await this.orders.save({
      ...data,
      id: orderId,
    });

    return updatedOrder;
  }
}
