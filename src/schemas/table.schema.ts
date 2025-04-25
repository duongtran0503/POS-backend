import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TableStatusEnum } from 'src/enums/table.status.enum';

@Schema({ timestamps: true })
export class Table {
  @Prop({ required: true, unique: true, trim: true })
  tableNumber: string;

  @Prop({ type: Number, required: true, min: 1 })
  capacity: number;

  @Prop({
    type: String,
    enum: TableStatusEnum,
    default: TableStatusEnum.AVAILABLE,
  })
  status: string;
}

export type tableDocument = Document & Table;
export const TableSchema = SchemaFactory.createForClass(Table);
