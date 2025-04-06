import { IsString, IsUrl, IsOptional, IsBoolean, IsInt } from 'class-validator';

export class CreateLinkDto {
  @IsString()
  title: string;

  @IsUrl()
  url: string;

  @IsOptional()
  @IsInt()
  order?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
