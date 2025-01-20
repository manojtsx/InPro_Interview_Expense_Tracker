import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Expense extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  date: Date;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  categoryId: Types.ObjectId; // Reference to the category

  @Prop({ type: String, default: '' })
  note: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId; // Reference to the user who added the expense

  @Prop({ default: false })
  isRecurring: Boolean;

  @Prop({default : Date.now})
  createdAt : Date;

  @Prop({default : Date.now()})
  updatedAt : Date;
  
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
