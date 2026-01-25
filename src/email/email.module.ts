import { Module } from '@nestjs/common';
import { EmailProviderService } from './email-provider/email-provider.service';
import { EmailTestController } from './email-test/email-test.controller';

@Module({
  providers: [EmailProviderService],
  exports: [EmailProviderService],
  controllers: [EmailTestController],
})
export class EmailModule {}
