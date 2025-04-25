import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class SearchRequest {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  @IsMongoId({ message: 'id danh mục không hợp lệ!' })
  category: string;
}
