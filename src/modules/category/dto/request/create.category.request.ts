import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CategoryTypeEnum } from 'src/enums/category.type.enum';

export class CreateCategoryRequest {
  @ApiProperty()
  @IsNotEmpty({ message: 'Mã danh mục không được để trống!' })
  @IsString()
  @MinLength(3, { message: 'Mã danh mục không hợp lệ!' })
  categoryCode: string;

  @ApiProperty()
  @IsNotEmpty()
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

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsEnum(CategoryTypeEnum)
  type?: CategoryTypeEnum;
}
