import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateVisitDto {
  @IsUUID()
  linkId: string;

  @IsOptional()
  @IsString()
  ipAddress?: string;

  @IsOptional()
  @IsString()
  userAgent?: string;
}
