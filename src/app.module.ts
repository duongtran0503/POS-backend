import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HelloModule } from './modules/hello/hello.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from 'src/modules/category/category.module';
import { UserModule } from 'src/modules/user/user.module';
import { StartupModule } from 'src/modules/startup/startup.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JWTAuthGuard } from 'src/modules/auth/guard/jwt.guard';
import { ProductModule } from 'src/modules/product/product.module';
import { TableModule } from 'src/modules/table/table.module';
import { OrderModule } from 'src/modules/order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL as string),
    HelloModule,
    CategoryModule,
    UserModule,
    StartupModule,
    AuthModule,
    ProductModule,
    TableModule,
    OrderModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JWTAuthGuard,
    },
  ],
})
export class AppModule {}
