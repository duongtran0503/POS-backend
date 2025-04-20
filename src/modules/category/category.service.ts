import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryRequest } from 'src/modules/category/dto/request/create.category.request';
import { Category, CategoryDocument } from 'src/schemas/category.schema';

@Injectable()
export class CatgegoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(data: CreateCategoryRequest) {
    try {
      const check = await this.categoryModel.findOne({
        categoryCode: data.categoryCode,
      });
      if (check) throw new ConflictException('Danh mục đã tồn tại');
      const newCategory = await this.categoryModel.create(data);
      return newCategory;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
