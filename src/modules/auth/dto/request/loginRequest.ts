import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginRequest {
  @ApiProperty()
  @IsNotEmpty({ message: 'Tên người dùng không được để trống!' })
  @MinLength(2, { message: 'Tên đăng nhập không hợp lệ!' })
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2, { message: 'Mật khẩu không hợp lệ!' })
  password: string;
}
