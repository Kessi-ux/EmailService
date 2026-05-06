import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { EmailProviderService } from './email-provider/email-provider.service';
import { EmailService } from './email.service';
import { EmailTestController } from './email-test/email-test.controller';
import { TemplateModule } from '../template/template.module';
import { QueueModule } from 'src/queue/queue.module';
import { EmailController } from './email.controller';

@Module({
  imports: [
    TemplateModule,
    QueueModule,
    BullModule.registerQueue({
      name: 'email-queue',
      redis: { host: 'localhost', port: 6379 },
    }),
  ],
  controllers: [EmailController, EmailTestController],
  providers: [EmailProviderService, EmailService],
})
export class EmailModule {}
