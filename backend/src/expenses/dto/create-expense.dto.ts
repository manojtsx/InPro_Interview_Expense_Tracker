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
  date: Date;

  @IsString()
  @IsEnum(['income', 'expense'])
  type: string;

  @IsMongoId()
  category: string;

  @IsString()
  note: string;

  @IsMongoId()
  user: string;
}
