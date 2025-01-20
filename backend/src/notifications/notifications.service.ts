import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from './schemas/notification.schema';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(@InjectModel(Notification.name) private notificationModel: Model<Notification>) {}

  async create(createDto: CreateNotificationDto): Promise<Notification> {
    const newNotification = new this.notificationModel(createDto);
    return newNotification.save();
  }

  async findAll(): Promise<Notification[]> {
    return this.notificationModel.find().populate('userId').exec();
  }

  async findOne(id: string): Promise<Notification | null> {
    return this.notificationModel.findById(id).populate('userId').exec();
  }

  async update(id: string, updateDto: UpdateNotificationDto): Promise<Notification | null> {
    return this.notificationModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Notification | null> {
    return this.notificationModel.findByIdAndDelete(id).exec();
  }
}
