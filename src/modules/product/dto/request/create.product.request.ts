import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  productCode: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  image: string | null;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  category: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isAvailable: boolean;
}
