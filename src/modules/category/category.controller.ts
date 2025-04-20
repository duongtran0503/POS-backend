import { Body, Controller, Post } from '@nestjs/common';
import { CatgegoryService } from 'src/modules/category/category.service';
import { CreateCategoryRequest } from 'src/modules/category/dto/request/create.category.request';

@Controller('/categories')
export class CategoryController {
  constructor(private readonly categoryService: CatgegoryService) {}

  @Post()
  create(@Body() requet: CreateCategoryRequest) {
    console.log(requet);
  }
}
