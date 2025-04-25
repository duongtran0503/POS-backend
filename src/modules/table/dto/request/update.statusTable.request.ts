import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { ValidateStatusTable } from 'src/common/validation/validate.statuslTable';

export class UpdateStatusTableRequest {
  @ApiProperty()
  @IsNotEmpty()
  @Validate(ValidateStatusTable, { message: 'Trạng thái bàn không hợp lệ!' })
  status: string;
}
