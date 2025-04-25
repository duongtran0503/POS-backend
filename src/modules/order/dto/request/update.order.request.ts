import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsNumber,
  Min,
  IsEnum,
  IsString,
  IsDate,
  IsMongoId,
} from 'class-validator';
import { OrderStatusEnum } from 'src/enums/order.status.enum';
import { OrderTypeEnum } from 'src/enums/order.type.enum';
import { PaymentStatusEnum } from 'src/enums/payment.status';
import { OrderDetailDTO } from 'src/modules/order/dto/request/create.order.request';

export class UpdateOrderRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderDetailDTO)
  orderDetails?: OrderDetailDTO[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalAmount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsMongoId()
  table?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  discountAmount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  finalAmount?: number;

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
