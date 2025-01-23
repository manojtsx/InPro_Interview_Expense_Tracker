import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsDate, IsEnum, IsMongoId, IsOptional } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsDate()
  @IsNotEmpty()
  @Type(()=>Date)
  date: Date;

  @IsMongoId()
  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @IsString()
  @IsOptional()
  note?: string;

  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  userId: string;
}
