import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ReserVationStatusEnum } from 'src/enums/reservation.status.enum';

export class UpdateHandleReservationRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ReserVationStatusEnum)
  status: ReserVationStatusEnum;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  feedback: string;
}
