import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Category {
  @Prop({ unique: true, required: true, min: 1 })
  categoryCode: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: null })
  description: string;

  @Prop({ default: null })
  image: string;
}

export type CategoryDocument = Document & Category;
export const CategorySchema = SchemaFactory.createForClass(Category);
