import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from 'src/modules/category/category.controller';
import { CatgegoryService } from 'src/modules/category/category.service';
import { Category, CategorySchema } from 'src/schemas/category.schema';

@Module({
  controllers: [CategoryController],
  providers: [CatgegoryService],
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
})
export class CategoryModule {}
