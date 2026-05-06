// send-template-email.dto.ts
import { IsEmail, IsNotEmpty, IsObject, IsString } from 'class-validator';

export class SendTemplateEmailDto {
  @IsEmail()
  to: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  template: string;

  @IsObject()
  data: Record<string, any>;
}
