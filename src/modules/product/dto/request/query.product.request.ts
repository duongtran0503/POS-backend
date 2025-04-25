import { IsNumber, IsOptional } from 'class-validator';

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
}
