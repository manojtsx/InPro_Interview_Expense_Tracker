import { IsNotEmpty, IsNumber, IsMongoId, IsDate, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CategoryTotal {
  @IsMongoId()
  @IsNotEmpty()
  categoryId: string;

  @IsNumber()
  @IsNotEmpty()
  total: number;
}

export class CreateReportDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @IsDate()
  @IsNotEmpty()
  endDate: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryTotal)
  categories: CategoryTotal[];

  @IsNumber()
  @IsNotEmpty()
  totalSpent: number;
}
