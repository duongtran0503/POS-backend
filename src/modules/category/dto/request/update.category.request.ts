import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateCategoryRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Tên danh mục quá ngắn!' })
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(200, { message: 'Mô tả danh mục quá dài!' })
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  image: string;
}
