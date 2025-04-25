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
import { CreateProductRequest } from 'src/modules/product/dto/request/create.product.request';
import { QueryProductRequest } from 'src/modules/product/dto/request/query.product.request';
import { SearchRequest } from 'src/modules/product/dto/request/search.request';
import { UpdateProductRequest } from 'src/modules/product/dto/request/update.product.request';
import { ProductService } from 'src/modules/product/product.service';

@ApiTags('Products')
@Controller('/products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Roles(Role.ADMIN)
  @Post()
  createProduct(@Body() request: CreateProductRequest) {
    return this.productService.createProduct(request);
  }

  @Public()
  @Get()
  getAllProduct(@Query() query: QueryProductRequest) {
    return this.productService.getProducts(query);
  }

  @Roles(Role.ADMIN)
  @Put('/:id')
  updateProduct(
    @Body() request: UpdateProductRequest,
    @Param('id', new ValidateMongoId()) id: string,
  ) {
    return this.productService.updateProduct(request, id);
  }

  @Public()
  @Get('/search')
  searchProduct(@Query() query: SearchRequest) {
    return this.productService.searchProduct(query);
  }

  @Public()
  @Get('/:id')
  getProductByid(@Param('id', new ValidateMongoId()) id: string) {
    return this.productService.getProductById(id);
  }

  @Roles(Role.ADMIN)
  @Delete('/:id')
  deleteProduct(@Param('id', new ValidateMongoId()) id: string) {
    return this.productService.deleteProduct(id);
  }
}
