import { Body, Controller, Post } from '@nestjs/common';
import { EmailTrackingService } from './email-tracking.service';

@Controller('webhooks/email')
export class EmailWebhookController {
  constructor(private readonly trackingService: EmailTrackingService) {}

  @Post()
  async handleWebhook(@Body() payload: any[]) {
    return this.trackingService.processEvents(payload);
  }
}
