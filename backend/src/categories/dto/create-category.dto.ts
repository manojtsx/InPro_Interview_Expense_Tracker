import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEnum(['income', 'expense'])
  type: string;

  @IsString()
  description: string;
}
