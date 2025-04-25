import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';
import { ValidateStatusTable } from 'src/common/validation/validate.statuslTable';

export class CreateTableRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tableNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  capacity: number;

  @ApiProperty()
  @IsNotEmpty()
  @Validate(ValidateStatusTable, { message: 'Trạng thái bàn không hợp lệ!' })
  status: string;
}
