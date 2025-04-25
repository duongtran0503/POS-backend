import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesGuard } from 'src/modules/auth/guard/role.guard';
import { ReservationController } from 'src/modules/table/reservation.controller';
import { ReservationService } from 'src/modules/table/reservation.service';
import { TableController } from 'src/modules/table/table.controller';
import { TableService } from 'src/modules/table/table.service';
import { Reservation, ReservationSchema } from 'src/schemas/reservation.schema';
import { Table, TableSchema } from 'src/schemas/table.schema';

@Module({
  controllers: [TableController, ReservationController],
  providers: [
    TableService,
    ReservationService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  imports: [
    MongooseModule.forFeature([
      { name: Table.name, schema: TableSchema },
      { name: Reservation.name, schema: ReservationSchema },
    ]),
  ],
})
export class TableModule {}
