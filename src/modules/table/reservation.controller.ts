import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ValidateMongoId } from 'src/common/pipes/ValidateMongoId';
import { Public } from 'src/decorator/public.decorator';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/enums/role.enum';
import { CreateReservationRequest } from 'src/modules/table/dto/request/create.reservation';
import { UpdateHandleReservationRequest } from 'src/modules/table/dto/request/updata.handleReservation.request';
import { UpdateReservationRequest } from 'src/modules/table/dto/request/update.reservation.request';
import { ReservationService } from 'src/modules/table/reservation.service';

@ApiTags('Reservation')
@Controller('/reservation')
export class ReservationController {
  constructor(private reservationService: ReservationService) {}

  @Public()
  @Post()
  createReservation(@Body() request: CreateReservationRequest) {
    return this.reservationService.createReservation(request);
  }

  @Roles(Role.ADMIN)
  @Get()
  getAllReservation() {
    return this.reservationService.getAllReservation();
  }

  @Public()
  @Put('/:id')
  updateReservation(
    @Body() request: UpdateReservationRequest,
    @Param('id', new ValidateMongoId()) id: string,
  ) {
    return this.reservationService.updateReservation(request, id);
  }

  @Roles(Role.EMPLOYEE, Role.ADMIN)
  @Put('/feedback/:id')
  updateHandleReservation(
    @Body() request: UpdateHandleReservationRequest,
    @Param('id', new ValidateMongoId()) id: string,
  ) {
    return this.reservationService.updateFeebackAndStatus(request, id);
  }

  @Roles(Role.ADMIN)
  @Delete('/:id')
  deleteReservation(@Param('id', new ValidateMongoId()) id: string) {
    return this.reservationService.deleteReservation(id);
  }
}
