import { Controller, Get } from '@nestjs/common';
import { EmailProviderService } from '../email-provider/email-provider.service';
import { EmailService } from '../email.service';
import { QueueService } from '../../queue/queue.service';

@Controller('email-test')
export class EmailTestController {
  constructor(
    private readonly emailProvider: EmailProviderService,
    private readonly emailService: EmailService,
    private readonly queueService: QueueService,
  ) {}

  @Get('send')
  async sendTestEmail() {
    await this.emailProvider.sendEmail({
      to: 'uchenyikesandu@gmail.com',
      subject: 'Email Service Test',
      html: '<h1>Email service is working 🎉</h1>',
    });

    return { message: 'Test email sent' };
  }

  @Get('send-welcome')
  async sendWelcome() {
    return this.emailService.sendWelcomeEmail({
      firstName: 'Kesandu',
      lastName: 'Uchenyi',
      email: 'uchenyikesandu@gmail.com',
    });
  }
}
