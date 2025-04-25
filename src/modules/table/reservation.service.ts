import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReservationRequest } from 'src/modules/table/dto/request/create.reservation';
import { UpdateHandleReservationRequest } from 'src/modules/table/dto/request/updata.handleReservation.request';
import { UpdateReservationRequest } from 'src/modules/table/dto/request/update.reservation.request';
import { TableService } from 'src/modules/table/table.service';
import {
  Reservation,
  ReserVationDocument,
} from 'src/schemas/reservation.schema';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private readonly reservationModel: Model<ReserVationDocument>,
    private tableService: TableService,
  ) {}

  async getAllReservation() {
    try {
      return await this.reservationModel.find();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  async createReservation(data: CreateReservationRequest) {
    try {
      const table = await this.tableService.getTableByid(data.table);
      if (table) {
        if (table.capacity < data.guestCount) {
          throw new BadRequestException(
            `Bàn ${table?.tableNumber} chỉ dành cho ${table?.capacity} người vui lòng chọn bàn khác!`,
          );
        }
      } else {
        throw new BadRequestException('Lỗi đặt bàn!');
      }
      return this.reservationModel.create({
        ...data,
        table: data.table,
      });
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException();
    }
  }

  async updateReservation(data: UpdateReservationRequest, id: string) {
    try {
      const table = await this.tableService.getTableByid(data.table);
      if (table) {
        if (table.capacity < data.guestCount) {
          throw new BadRequestException(
            `Bàn ${table?.tableNumber} chỉ dành cho ${table?.capacity} người vui lòng chọn bàn khác!`,
          );
        }
      } else {
        throw new BadRequestException('Lỗi đặt bàn!');
      }
      const update = await this.reservationModel.findByIdAndUpdate(
        id,
        {
          ...data,
        },
        {
          new: true,
        },
      );
      return update;
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException();
    }
  }

  async updateFeebackAndStatus(
    data: UpdateHandleReservationRequest,
    id: string,
  ) {
    try {
      return await this.reservationModel.findByIdAndUpdate(
        id,
        {
          feedback: data.feedback,
          status: data.status,
        },
        {
          new: true,
        },
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  async deleteReservation(id: string) {
    await this.reservationModel.findByIdAndDelete(id);
  }
}
