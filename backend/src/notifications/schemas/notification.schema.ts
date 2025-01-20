import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class Notification extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId; // References Users._id

  @Prop({ type: String, required: true })
  message: string;

  @Prop({ type: String, enum: ['warning', 'info', 'reminder'], required: true })
  type: string; // e.g., warning, info, reminder

  @Prop({ type: Boolean, default: false })
  isRead: boolean; // True if the notification is read
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
