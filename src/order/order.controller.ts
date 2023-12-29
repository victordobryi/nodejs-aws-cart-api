import { Body, Controller, Delete, Get, Param, Put, Req } from '@nestjs/common';

import { OrderService } from './services';

@Controller('api/order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  async getOrders() {
    const orders = await this.orderService.findAll();

    return {
      statusCode: 200,
      message: 'OK',
      data: orders,
    };
  }

  // get order by id
  @Get(':id')
  async getOrder(@Param('id') id) {
    const order = await this.orderService.findById(id);

    return {
      statusCode: 200,
      message: 'OK',
      data: order,
    };
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id) {
    const order = await this.orderService.delete(id);

    return {
      statusCode: 200,
      message: 'OK',
      data: order,
    };
  }
}
