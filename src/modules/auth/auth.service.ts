import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginRequest } from 'src/modules/auth/dto/request/loginRequest';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userLogin: LoginRequest) {
    const user = await this.userService.findUserByUsername(userLogin.username);
    if (user && (await bcrypt.compare(userLogin.password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  login(user: { id: string; role: string }) {
    const token = this.jwtService.sign(
      { sub: user.id, role: user.role },
      { secret: process.env.JWT_SECRET_KEY },
    );
    return { token };
  }
}
