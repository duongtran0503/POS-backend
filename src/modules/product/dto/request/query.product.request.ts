import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ProductTypeEnum } from 'src/enums/product.type.enum';

export class QueryProductRequest {
  @IsOptional()
  name: string;

  @IsOptional()
  @IsNumber()
  page: number;

  @IsOptional()
  @IsNumber()
  itemsPerPage: number;

  @IsOptional()
  category: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(ProductTypeEnum)
  type?: ProductTypeEnum;
}
