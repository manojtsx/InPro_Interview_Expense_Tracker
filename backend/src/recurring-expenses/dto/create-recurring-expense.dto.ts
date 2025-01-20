import { IsNotEmpty, IsNumber, IsString, IsMongoId, IsOptional, IsEnum, IsDate } from 'class-validator';

export class CreateRecurringExpenseDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsMongoId()
  @IsNotEmpty()
  categoryId: string;

  @IsEnum(['daily', 'weekly', 'monthly', 'yearly'])
  @IsNotEmpty()
  frequency: string;

  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @IsDate()
  @IsOptional()
  endDate?: Date;
}
