import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendTemplateEmailDto } from './dto/send-template-email.dto';
import { SendNewsletterDto } from './dto/send-newsletter.dto';
import { CreateTemplateDto } from './dto/create-template.dto';

@Controller('emails')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  // POST /emails/send
  @Post('send')
  async sendEmail(@Body() dto: SendTemplateEmailDto) {
    await this.emailService.sendTemplateEmail(dto);
    return { message: 'Email queued successfully' };
  }

  // POST /emails/newsletter
  @Post('newsletter')
  async sendNewsletter(@Body() dto: SendNewsletterDto) {
    await this.emailService.sendNewsletter(dto);
    return { message: 'Newsletter queued successfully' };
  }

  // POST /emails/templates
  @Post('templates')
  async createTemplate(@Body() dto: CreateTemplateDto) {
    return this.emailService.createTemplate(dto);
  }
}
