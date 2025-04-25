import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from 'src/modules/auth/auth.controller';
import { AuthService } from 'src/modules/auth/auth.service';
import { RolesGuard } from 'src/modules/auth/guard/role.guard';
import { JWtStrategy } from 'src/modules/auth/jwt.strategy';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    JWtStrategy,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY as string,
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class AuthModule {}
