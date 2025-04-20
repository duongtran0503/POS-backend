import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCategoryRequest {
  @IsNotEmpty({ message: 'Mã danh mục không được để trống!' })
  @IsString()
  @MinLength(3, { message: 'Mã danh mục không hợp lệ!' })
  categoryCode: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2, { message: 'Tên danh mục quá ngắn!' })
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(200, { message: 'Mô tả danh mục quá dài!' })
  desicription: string;
  @IsOptional()
  @IsString()
  image: string;
}
