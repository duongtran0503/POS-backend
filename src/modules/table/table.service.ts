import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTableRequest } from 'src/modules/table/dto/request/create.table';
import { UpdateStatusTableRequest } from 'src/modules/table/dto/request/update.statusTable.request';
import { Table, tableDocument } from 'src/schemas/table.schema';

@Injectable()
export class TableService {
  constructor(
    @InjectModel(Table.name) private readonly tableModel: Model<tableDocument>,
  ) {}

  async getAllTable(status?: string) {
    try {
      if (status) {
        return await this.tableModel.find({
          status: status,
        });
      }
      return await this.tableModel.find();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  async createTable(data: CreateTableRequest) {
    try {
      const check = await this.tableModel.findOne({
        tableNumber: data.tableNumber,
      });
      if (check) {
        throw new ConflictException('Bàn đã tồn tại!');
      }
      const createTable = await this.tableModel.create(data);
      return createTable;
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  async updateStatusTable(data: UpdateStatusTableRequest, id: string) {
    try {
      const check = await this.tableModel.findById(id);
      if (!check) {
        throw new BadRequestException('Bàn chưa được tạo!');
      }
      const update = await this.tableModel.findByIdAndUpdate(
        id,
        {
          status: data.status,
        },
        {
          new: true,
        },
      );
      return update;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  async getTableByid(id: string) {
    try {
      return await this.tableModel.findById(id);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async deleteTable(id: string) {
    await this.tableModel.findByIdAndDelete(id);
  }
}
