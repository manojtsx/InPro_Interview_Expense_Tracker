import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class RecurringExpense extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId; // References Users._id

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  categoryId: Types.ObjectId; // References Categories._id

  @Prop({ type: String, enum: ['daily', 'weekly', 'monthly', 'yearly'], required: true })
  frequency: string; // e.g., daily, weekly, monthly

  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({ type: Date, default: null })
  endDate: Date; // null if indefinitely recurring
}

export const RecurringExpenseSchema = SchemaFactory.createForClass(RecurringExpense);
