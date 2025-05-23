import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesGuard } from 'src/modules/auth/guard/role.guard';
import { CategoryController } from 'src/modules/category/category.controller';
import { CatgegoryService } from 'src/modules/category/category.service';
import { Category, CategorySchema } from 'src/schemas/category.schema';

@Module({
  controllers: [CategoryController],
  providers: [
    CatgegoryService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  exports: [CatgegoryService],
})
export class CategoryModule {}
