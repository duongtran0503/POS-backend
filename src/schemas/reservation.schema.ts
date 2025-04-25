import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Table } from 'src/schemas/table.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ReserVationStatusEnum } from 'src/enums/reservation.status.enum';

@Schema({ timestamps: true })
export class Reservation {
  @Prop({ type: String, required: true, trim: true })
  customerName: string;

  @Prop({ type: String, required: true, trim: true })
  customerPhone: string;

  @Prop({ type: Date, required: true })
  reservationDate: Date;

  @Prop({ type: Number, required: true, default: 1 })
  guestCount: number;

  @Prop({
    type: String,
    enum: ReserVationStatusEnum,
    default: ReserVationStatusEnum.PENDING,
  })
  status: string;

  @Prop({ type: String, required: false, trim: true, default: '' })
  specialRequests: string;

  @Prop({ type: String, required: false, trim: true, default: '' })
  feedback: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Table', required: true })
  table: Table;
}

export type ReserVationDocument = Document & Reservation;
export const ReservationSchema = SchemaFactory.createForClass(Reservation);
