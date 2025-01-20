import { IsNotEmpty, IsNumber, IsString, IsDate, IsMongoId, IsArray } from 'class-validator';

export class CreateBudgetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @IsDate()
  @IsNotEmpty()
  endDate: Date;

  @IsMongoId()
  @IsNotEmpty()
  user: string;

  @IsArray()
  @IsMongoId({ each: true })
  categories: string[];
}
