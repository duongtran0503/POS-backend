import { IsEnum, IsOptional } from 'class-validator';
import { CategoryTypeEnum } from 'src/enums/category.type.enum';

export class QueryCategoryRequest {
  @IsOptional()
  @IsEnum(CategoryTypeEnum)
  type?: CategoryTypeEnum;
}
