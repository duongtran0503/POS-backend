import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  ValidateNested,
  IsNumber,
  Min,
  IsOptional,
  IsString,
  IsEnum,
  IsMongoId,
  IsDate,
  ArrayMinSize,
  IsBoolean,
} from 'class-validator';
import { OrderStatusEnum } from 'src/enums/order.status.enum';
import { OrderTypeEnum } from 'src/enums/order.type.enum';
import { PaymentStatusEnum } from 'src/enums/payment.status';

export class OrderDetailDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  product: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional()
  @IsBoolean()
  isNew: boolean;
}

export class CreateOrderRequest {
  @ApiProperty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderDetailDTO)
  orderDetails: OrderDetailDTO[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsMongoId()
  table?: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  totalAmount: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  discountAmount: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  finalAmount: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(OrderStatusEnum)
  status?: OrderStatusEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(OrderTypeEnum)
  orderType?: OrderTypeEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  staffNotes?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  customNotes?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(PaymentStatusEnum)
  paymentStatus?: PaymentStatusEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  paymentDate?: Date;
}
