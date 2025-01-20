import { IsNotEmpty, IsMongoId, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateNotificationDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  type: 'warning' | 'info' | 'reminder';

  @IsBoolean()
  @IsOptional()
  isRead?: boolean;
}
