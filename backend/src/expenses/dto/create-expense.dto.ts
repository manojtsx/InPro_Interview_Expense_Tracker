import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsDate, IsEnum, IsMongoId } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  date: Date;

  @IsMongoId()
  categoryId: string;

  @IsString()
  note: string;

  @IsMongoId()
  userId: string;
}
