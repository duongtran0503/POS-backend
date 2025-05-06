import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryRequest } from 'src/modules/category/dto/request/create.category.request';
import { QueryCategoryRequest } from 'src/modules/category/dto/request/query.category';
import { SearchCategoryRequest } from 'src/modules/category/dto/request/search.category.request';
import { UpdateCategoryRequest } from 'src/modules/category/dto/request/update.category.request';
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

  async getAllCategory(query: QueryCategoryRequest) {
    try {
      if (query.type) {
        return await this.categoryModel.find({ type: query.type });
      } else {
        return await this.categoryModel.find();
      }
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  async updateCategory(data: UpdateCategoryRequest, id: string) {
    try {
      const check = await this.categoryModel.exists({ _id: id });
      if (!check) throw new BadRequestException('Danh mục không tồn tại!');
      const update = await this.categoryModel.findByIdAndUpdate(
        id,
        {
          ...data,
        },
        { new: true },
      );
      return update;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async deleteCategory(id: string) {
    try {
      await this.categoryModel.findByIdAndDelete(id);
    } catch (error) {
      console.error('delete category error:', error);
    }
  }

  async searchCategory(query: SearchCategoryRequest) {
    try {
      const condition: any[] = [];
      if (query.name) {
        condition.push({ name: { $regex: new RegExp(query.name, 'i') } });
      }
      if (query.code) {
        condition.push({
          categoryCode: { $regex: new RegExp(query.code, 'i') },
        });
      }
      if (condition.length > 0) {
        return await this.categoryModel.find({ $or: condition });
      }
      return await this.categoryModel.find();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  async findCategoryById(id: string) {
    try {
      return this.categoryModel.findById(id);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
