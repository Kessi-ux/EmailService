// send-newsletter.dto.ts
import { IsArray, IsEmail, IsString, ArrayNotEmpty } from 'class-validator';

export class SendNewsletterDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsEmail({}, { each: true })
  recipients: string[];

  @IsString()
  subject: string;

  @IsString()
  html: string;
}
