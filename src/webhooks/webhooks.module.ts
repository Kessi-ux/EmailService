import { Module } from '@nestjs/common';
import { EmailWebhookController } from './email-webhook.controller';
import { EmailTrackingService } from './email-tracking.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { UnsubscribeModule } from 'src/unsubscribe/unsubscribe.module';

@Module({
  imports: [PrismaModule, UnsubscribeModule],
  controllers: [EmailWebhookController],
  providers: [EmailTrackingService],
})
export class WebhooksModule {}
