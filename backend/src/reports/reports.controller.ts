import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UpdateReportDto } from './dto/update-report.dto';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
    constructor(private readonly service: ReportsService) {}

  @Post()
  create(@Body() createDto: CreateReportDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateReportDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
