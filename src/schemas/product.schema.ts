import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category } from 'src/schemas/category.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ProductTypeEnum } from 'src/enums/product.type.enum';
@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: true })
  productCode: string;

  @Prop({ default: null })
  description: string;

  @Prop({ default: null })
  image: string;

  @Prop({ required: true })
  price: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  category: Category;

  @Prop({ default: true })
  isAvailable: boolean;

  @Prop({ type: String, enum: ProductTypeEnum, default: ProductTypeEnum.FOOD })
  type: string;
}

export type ProductDocument = Document & Product;
export const ProductSchema = SchemaFactory.createForClass(Product);
