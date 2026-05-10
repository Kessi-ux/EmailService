import { Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull';
import { EmailProviderService } from '../email/email-provider/email-provider.service';
import { Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Processor('email-queue')
export class QueueProcessor {
  private readonly logger = new Logger(QueueProcessor.name);

  constructor(
    private readonly emailProvider: EmailProviderService,
    private readonly prisma: PrismaService,
  ) {}

  @Process('send-email')
  async handleSendEmail(job: Job) {
    const email = job.data;
    this.logger.log(`Processing email to ${email.to} | attempt ${job.attemptsMade + 1}`);

    try {
      //Send Email
      const result = await this.emailProvider.sendEmail(email);

      //Store Delivery Event
      await this.prisma.emailEvent.create({
        data: {
          email: email.to,
          messageId: result?.messageId || null,
          type: 'DELIVERED',
          metadata: result || {},
        },
      });

      this.logger.log(`Email successfully sent to ${email.to}`);
      return result;
    } catch (err) {
      this.logger.error(`Failed to send email to ${email.to} | ${err.message}`);
      throw err; // Bull will automatically retry according to `attempts`
    }
  }
}
