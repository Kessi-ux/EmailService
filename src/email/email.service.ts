import { Injectable, BadRequestException } from '@nestjs/common';
//import { EmailProviderService } from './email-provider/email-provider.service';
import { TemplateService } from '../template/template.service';
import { QueueService } from '../queue/queue.service';
import { UnsubscribeService } from 'src/unsubscribe/unsubscribe.service';

@Injectable()
export class EmailService {
  constructor(
    //private readonly emailProvider: EmailProviderService,
    private readonly unsubscribeService: UnsubscribeService,
    private readonly queueService: QueueService,
    private readonly templateService: TemplateService,
  ) {}

  private async assertNotUnsubscribed(email: string) {
    const normalizedEmail = email.toLowerCase().trim();

    const unsubscribed = await this.unsubscribeService.isUnsubscribed(normalizedEmail);

    if (unsubscribed) {
      throw new BadRequestException('Recipient has unsubscribed');
    }
  }

  async sendWelcomeEmail(user: { firstName: string; lastName: string; email: string }) {
    await this.assertNotUnsubscribed(user.email);
    // Compile template
    const html = this.templateService.compileTemplate('welcome', user);

    // Send email via EmailProviderService
    // return this.emailProvider.sendEmail({
    await this.queueService.addEmailToQueue({
      to: user.email,
      subject: 'Welcome!',
      html,
    });
  }

  async sendTransactionalEmail(dto: { to: string; subject: string; html: string; text?: string }) {
    await this.assertNotUnsubscribed(dto.to);
    await this.queueService.addEmailToQueue(dto);
  }

  /* Templated Email */
  async sendTemplateEmail(dto: {
    to: string;
    subject: string;
    template: string;
    data: Record<string, any>;
  }) {
    await this.assertNotUnsubscribed(dto.to);
    const html = this.templateService.compileTemplate(dto.template, dto.data);

    if (!html) {
      throw new Error(`Template "${dto.template}" failed to compile`);
    }

    await this.queueService.addEmailToQueue({
      to: dto.to,
      subject: dto.subject,
      html,
    });
  }

  /* End of Templated Email */

  async sendNewsletter(dto: { recipients: string[]; subject: string; html: string }) {
    for (const email of dto.recipients) {
      await this.assertNotUnsubscribed(email);
      await this.queueService.addEmailToQueue({
        to: email,
        subject: dto.subject,
        html: dto.html,
      });
    }
  }

  async createTemplate(dto: { name: string; html: string }) {
    return this.templateService.saveTemplate(dto.name, dto.html);
  }
}
