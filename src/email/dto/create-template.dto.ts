// create-template.dto.ts
import { IsString } from 'class-validator';

export class CreateTemplateDto {
  @IsString()
  name: string;

  @IsString()
  html: string;
}
