import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatgegoryService } from 'src/modules/category/category.service';
import { CreateProductRequest } from 'src/modules/product/dto/request/create.product.request';
import { QueryProductRequest } from 'src/modules/product/dto/request/query.product.request';
import { SearchRequest } from 'src/modules/product/dto/request/search.request';
import { UpdateProductRequest } from 'src/modules/product/dto/request/update.product.request';
import { Product, ProductDocument } from 'src/schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
    private readonly categoryService: CatgegoryService,
  ) {}

  async createProduct(data: CreateProductRequest) {
    try {
      const category = await this.categoryService.findCategoryById(
        data.category,
      );
      if (!category) throw new BadRequestException('Danh mục không tồn tại!');
      const checkProduct = await this.productModel.exists({
        productCode: data.productCode,
      });
      if (checkProduct) throw new ConflictException('Sản phầm đã tồn tại!');
      const product = await this.productModel.create({
        ...data,
        category: data.category,
      });
      return product;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      if (error instanceof ConflictException) throw error;
      throw new InternalServerErrorException();
    }
  }

  async updateProduct(data: UpdateProductRequest, id: string) {
    try {
      const checkCatggory = await this.categoryService.findCategoryById(
        data.category,
      );
      if (!checkCatggory) {
        throw new BadRequestException('Danh mục không tồn tại!');
      }

      const update = await this.productModel.findByIdAndUpdate(
        id,
        {
          ...data,
          category: data.category,
        },
        {
          new: true,
        },
      );
      return update;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      console.error(error);
      throw new InternalServerErrorException('Lỗi cập nhật sản phẩm!');
    }
  }

  async getProducts(query: QueryProductRequest) {
    try {
      const page = !query.page && query.page > 0 ? query.page : 1;
      const itemsPerPage = query.itemsPerPage ?? 10;
      const next = (page - 1) * itemsPerPage;
      const products = await this.productModel
        .find()
        .skip(next)
        .limit(itemsPerPage);
      const totalProduct = await this.productModel.countDocuments();
      let currentItemsPerPage = next + itemsPerPage;
      if (totalProduct < currentItemsPerPage)
        currentItemsPerPage = totalProduct;

      return {
        products,
        page,
        totalProduct,
        currentItemsPerPage,
      };
    } catch (error) {
      console.error(error);
    }
  }

  async searchProduct(query: SearchRequest) {
    try {
      const condition: any[] = [];
      if (query.name) {
        condition.push({ name: { $regex: new RegExp(query.name, 'i') } });
      }
      if (query.category) {
        condition.push({ category: query.category });
      }
      if (condition.length > 0) {
        return await this.productModel.find({ $and: condition });
      }
      return await this.productModel.find();
    } catch (error) {
      console.error(error);
    }
  }
  async deleteProduct(id: string) {
    await this.productModel.findByIdAndDelete(id);
  }
  async getProductById(id: string) {
    return await this.productModel.findById(id).populate('category');
  }

  async getAllProductById(arrayId: string[]) {
    try {
      const products = await Promise.all(
        arrayId.map(async (id) => {
          const result = await this.productModel.findById(id);
          return result?.toObject() || null;
        }),
      );
      const foundProducts = products.filter((product) => product !== null);
      return foundProducts;
    } catch (error) {
      console.error(error);
    }
  }
}
