import { IsString, MinLength } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @MinLength(5)
  name: string;

  @IsString()
  description: string;
}
