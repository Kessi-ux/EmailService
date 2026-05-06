import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueProcessor } from './queue.processor';
import { QueueService } from './queue.service';
import { EmailProviderService } from '../email/email-provider/email-provider.service';

import { BullBoardModule } from '@bull-board/nestjs';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email-queue', // Queue name
      redis: {
        host: 'localhost', // your Redis host
        port: 6379, // Redis port
      },
    }),

    BullBoardModule.forRoot({
      route: '/admin/queues',
      adapter: ExpressAdapter,
    }),
    BullBoardModule.forFeature({
      name: 'email-queue',
      adapter: BullAdapter,
    }),
  ],
  providers: [QueueProcessor, QueueService, EmailProviderService],
  exports: [QueueService],
})
export class QueueModule {}
