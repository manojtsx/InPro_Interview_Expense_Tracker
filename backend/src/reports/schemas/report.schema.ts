import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Report extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId; // References Users._id

  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({ type: Date, required: true })
  endDate: Date;

  @Prop({
    type: [
      {
        categoryId: { type: Types.ObjectId, ref: 'Category', required: true },
        total: { type: Number, required: true },
      },
    ],
  })
  categories: {
    categoryId: Types.ObjectId; // References Categories._id
    total: number; // Total expenses for this category
  }[];

  @Prop({ required: true })
  totalSpent: number; // Total spent during the period

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
