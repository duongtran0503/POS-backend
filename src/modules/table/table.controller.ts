import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ValidateMongoId } from 'src/common/pipes/ValidateMongoId';
import { Public } from 'src/decorator/public.decorator';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/enums/role.enum';
import { CreateTableRequest } from 'src/modules/table/dto/request/create.table';
import { UpdateStatusTableRequest } from 'src/modules/table/dto/request/update.statusTable.request';
import { TableService } from 'src/modules/table/table.service';

@ApiTags('Tables')
@Controller('/tables')
export class TableController {
  constructor(private tableService: TableService) {}

  @Roles(Role.ADMIN)
  @Post()
  createTable(@Body() request: CreateTableRequest) {
    return this.tableService.createTable(request);
  }

  @Public()
  @Get()
  getAllTable(@Query('status') status: string) {
    return this.tableService.getAllTable(status);
  }

  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @Put('/:id')
  updateStatusTable(
    @Body() request: UpdateStatusTableRequest,
    @Param('id', new ValidateMongoId()) id: string,
  ) {
    return this.tableService.updateStatusTable(request, id);
  }

  @Roles(Role.ADMIN)
  @Delete('/:id')
  deleteTable(@Param('id', new ValidateMongoId()) id: string) {
    return this.tableService.deleteTable(id);
  }
}
