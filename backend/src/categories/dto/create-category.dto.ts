import { IsNotEmpty, IsString, IsEnum, IsMongoId } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  icon: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsString()
  description : string;
}
