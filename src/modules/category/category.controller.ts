import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ValidateMongoId } from 'src/common/pipes/ValidateMongoId';
import { Public } from 'src/decorator/public.decorator';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/enums/role.enum';
import { CatgegoryService } from 'src/modules/category/category.service';
import { CreateCategoryRequest } from 'src/modules/category/dto/request/create.category.request';
import { SearchCategoryRequest } from 'src/modules/category/dto/request/search.category.request';
import { UpdateCategoryRequest } from 'src/modules/category/dto/request/update.category.request';

@ApiTags('Category')
@Controller('/categories')
export class CategoryController {
  constructor(private readonly categoryService: CatgegoryService) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() requet: CreateCategoryRequest) {
    return this.categoryService.create(requet);
  }

  @Public()
  @Get()
  getAllCategories() {
    return this.categoryService.getAllCategory();
  }

  @Roles(Role.ADMIN)
  @Put('/:id')
  updateCategory(
    @Body() request: UpdateCategoryRequest,
    @Param('id', new ValidateMongoId()) id: string,
  ) {
    return this.categoryService.updateCategory(request, id);
  }

  @Roles(Role.ADMIN)
  @Delete('/:id')
  deleteCategory(@Param('id', new ValidateMongoId()) id: string) {
    return this.categoryService.deleteCategory(id);
  }

  @Public()
  @Get('/search')
  searchCategory(@Query() query: SearchCategoryRequest) {
    return this.categoryService.searchCategory(query);
  }
}
