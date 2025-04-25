import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ValidateMongoId } from 'src/common/pipes/ValidateMongoId';
import { Public } from 'src/decorator/public.decorator';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/enums/role.enum';
import { CreateOrderRequest } from 'src/modules/order/dto/request/create.order.request';
import { UpdateOrderRequest } from 'src/modules/order/dto/request/update.order.request';
import { OrderService } from 'src/modules/order/order.service';

@ApiTags('Orders')
@Controller('/orders')
export class OrderController {
  constructor(private orderServie: OrderService) {}

  @Public()
  @Post()
  createOrder(@Body() request: CreateOrderRequest) {
    return this.orderServie.createOrder(request);
  }

  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @Get()
  getAllOrder() {
    return this.orderServie.getAllOrder();
  }

  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @Get('/detail/:id')
  getDetailOrder(@Param('id', new ValidateMongoId()) id: string) {
    return this.orderServie.getOrderById(id);
  }

  @Public()
  @Put('/:id')
  updateOrder(
    @Body() request: UpdateOrderRequest,
    @Param('id', new ValidateMongoId()) id: string,
  ) {
    return this.orderServie.updateOrder(request, id);
  }

  @Roles(Role.ADMIN)
  @Delete('/:id')
  deleteOrder(@Param('id', new ValidateMongoId()) id: string) {
    return this.orderServie.deleteOrder(id);
  }
}
