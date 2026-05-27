import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  @Length(7, 100)
  name: string;

  @IsString()
  description: string;
}
