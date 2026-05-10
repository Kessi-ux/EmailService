import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import sgMail from '@sendgrid/mail';

@Injectable()
export class EmailProviderService {
  private readonly logger = new Logger(EmailProviderService.name);

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('EMAIL_PROVIDER_API_KEY');
    if (!apiKey) {
      throw new Error('EMAIL_PROVIDER_API_KEY is not set in .env');
    }
    sgMail.setApiKey(apiKey);

    const emailFrom = this.configService.get<string>('EMAIL_FROM');
    this.logger.log(`Using sender: ${emailFrom}`);
  }

  async sendEmail(options: { to: string; subject: string; html: string; text?: string }) {
    const msg = {
      to: options.to,
      from: this.configService.get('EMAIL_FROM'),
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    try {
      const [response] = await sgMail.send(msg);
      const messageId = response.headers['x-message-id'] || 'unknown';

      this.logger.log(`Email sent to ${options.to} | messageId: ${messageId}`);
      return { success: true, messageId };
    } catch (error) {
      //this.logger.error(`Failed to send email to ${options.to}`, error?.message);
      this.logger.error(
        `Failed to send email to ${options.to}`,
        JSON.stringify(error.response?.body || error.message),
      );
      throw error;
    }
  }
}
