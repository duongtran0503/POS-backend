import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import { ProductTypeEnum } from 'src/enums/product.type.enum';

export class SearchRequest {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  @IsMongoId({ message: 'id danh mục không hợp lệ!' })
  category: string;

  @IsOptional()
  @IsString()
  @IsEnum(ProductTypeEnum)
  type?: ProductTypeEnum;
}
