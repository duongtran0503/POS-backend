import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OrderStatusEnum } from 'src/enums/order.status.enum';
import { OrderTypeEnum } from 'src/enums/order.type.enum';
import { Product } from 'src/schemas/product.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { PaymentStatusEnum } from 'src/enums/payment.status';
import { Table } from 'src/schemas/table.schema';

@Schema({ timestamps: true })
export class Order {
  @Prop({
    type: [
      {
        product: {
          type: MongooseSchema.Types.ObjectId,
          require: true,
          ref: 'Product',
        },
        quantity: { type: Number, require: true, min: 1 },
        notes: { type: String, require: false, default: '' },
        isNew: { type: Boolean, require: true },
      },
    ],
  })
  orderDetails: { product: Product; quantity: number; notes: string }[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Table', required: false })
  table?: Table;

  @Prop({ type: Number, min: 0, default: 0 })
  totalAmount: number;

  @Prop({ type: Number, min: 0, default: 0 })
  discountAmount: number;

  @Prop({ type: Number, min: 0, default: 0 })
  finalAmount: number;

  @Prop({
    type: String,
    enum: OrderStatusEnum,
    default: OrderStatusEnum.PENDING,
  })
  status: string;

  @Prop({
    type: String,
    enum: OrderTypeEnum,
    default: OrderTypeEnum.DINE_IN,
  })
  orderType: string;

  @Prop({ type: String, required: false, trim: true, default: '' })
  staffNotes: string;

  @Prop({ type: String, required: false, trim: true, default: '' })
  customNotes: string;

  @Prop({
    type: String,
    enum: PaymentStatusEnum,
    default: PaymentStatusEnum.UNPAID,
  })
  paymentStatus: string;

  @Prop({ type: Date })
  paymentDate?: Date;
}

export type OrderDocument = Document & Order;
export const OrderSchema = SchemaFactory.createForClass(Order);
