import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderRequest } from 'src/modules/order/dto/request/create.order.request';
import { UpdateOrderRequest } from 'src/modules/order/dto/request/update.order.request';
import { ProductService } from 'src/modules/product/product.service';
import { Order, OrderDocument } from 'src/schemas/order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    private readonly productService: ProductService,
  ) {}

  async createOrder(data: CreateOrderRequest) {
    try {
      const productsId = data.orderDetails.map((order) => order.product);
      const products = await this.productService.getAllProductById(productsId);
      if (products) {
        const totalPrice = products
          .map((product) => {
            const quantity =
              data.orderDetails.find((order) => {
                return order.product === product._id?.toString();
              })?.quantity || 1;

            return {
              quantity,
              product,
            };
          })
          .reduce(
            (total, current) =>
              total + current.product.price * current.quantity,
            0,
          );
        if (totalPrice !== data.totalAmount) {
          throw new BadRequestException(
            'Giá trị đơn hàng không hợp lệ vui lòng kiểm tra lại đơn hàng!',
          );
        }
      } else {
        throw new BadRequestException('Sản phầm không tồn tại!');
      }

      return await this.orderModel.create(data);
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException();
    }
  }

  async updateOrder(data: UpdateOrderRequest, id: string) {
    try {
      const productOrder = data.orderDetails?.map((order) => order.product);
      if (productOrder) {
        const products =
          await this.productService.getAllProductById(productOrder);
        if (products) {
          const totalPrice = products
            .map((product) => {
              const quantity =
                data.orderDetails?.find(
                  (order) => order.product === product._id?.toString(),
                )?.quantity || 1;
              return {
                quantity,
                product,
              };
            })
            .reduce(
              (total, current) =>
                total + current.product.price * current.quantity,
              0,
            );
          if (totalPrice !== data.totalAmount) {
            throw new BadRequestException('Giá trị đơn hàng không hợp lệ!');
          }
        } else {
          throw new BadRequestException('Lỗi chọn món!');
        }
      }
      const update = await this.orderModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      return update;
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException();
    }
  }

  async deleteOrder(id: string) {
    try {
      await this.orderModel.findByIdAndDelete(id);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  async getAllOrder() {
    try {
      return await this.orderModel.find();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  async getOrderById(id: string) {
    try {
      return await this.orderModel
        .findById(id)
        .populate(['orderDetails.product', 'table']);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }
}
