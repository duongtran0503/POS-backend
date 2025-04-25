import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ReserVationStatusEnum } from 'src/enums/reservation.status.enum';

export class CreateReservationRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  customerPhone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  reservationDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  guestCount: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(ReserVationStatusEnum)
  status: ReserVationStatusEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  specialRequests?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  table: string;
}
