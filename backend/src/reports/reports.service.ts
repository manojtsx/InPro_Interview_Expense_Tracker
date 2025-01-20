import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report } from './schemas/report.schema';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectModel(Report.name) private reportModel: Model<Report>) {}

  async create(createDto: CreateReportDto): Promise<Report> {
    const newReport = new this.reportModel(createDto);
    return newReport.save();
  }

  async findAll(): Promise<Report[]> {
    return this.reportModel.find().populate('userId categories.categoryId').exec();
  }

  async findOne(id: string): Promise<Report | null> {
    return this.reportModel.findById(id).populate('userId categories.categoryId').exec();
  }

  async update(id: string, updateDto: UpdateReportDto): Promise<Report | null> {
    return this.reportModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Report | null> {
    return this.reportModel.findByIdAndDelete(id).exec();
  }
}
