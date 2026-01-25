import { Controller, Get } from '@nestjs/common';
import { EmailProviderService } from '../email-provider/email-provider.service';

@Controller('email-test')
export class EmailTestController {
  constructor(private readonly emailProvider: EmailProviderService) {}

  @Get('send')
  async sendTestEmail() {
    await this.emailProvider.sendEmail({
      to: 'uchenyikesandu@gmail.com',
      subject: 'Email Service Test',
      html: '<h1>Email service is working 🎉</h1>',
    });

    return { message: 'Test email sent' };
  }
}
