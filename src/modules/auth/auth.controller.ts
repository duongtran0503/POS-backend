import { AuthService } from 'src/modules/auth/auth.service';
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { LoginRequest } from 'src/modules/auth/dto/request/loginRequest';
import { Public } from 'src/decorator/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(private authSeravice: AuthService) {}

  @Public()
  @Post('/login')
  async login(@Body() request: LoginRequest) {
    const user = await this.authSeravice.validateUser(request);
    if (!user) {
      throw new BadRequestException('Tên người dùng hoặc mật khẩu không đúng!');
    }
    return this.authSeravice.login({
      id: user._id.toString(),
      role: user.role,
    });
  }
}
