import { Module } from '@nestjs/common';
import { UnsubscribeController } from './unsubscribe.controller';
import { UnsubscribeService } from './unsubscribe.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [UnsubscribeController],
  providers: [UnsubscribeService, PrismaService],
  exports: [UnsubscribeService],
})
export class UnsubscribeModule {}
