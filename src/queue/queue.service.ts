import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('email-queue') private readonly emailQueue: Queue) {}

  async addEmailToQueue(email: { to: string; subject: string; html: string; text?: string }) {
    await this.emailQueue.add('send-email', email, {
      attempts: 5, // Retry up to 5 times
      backoff: { type: 'exponential', delay: 5000 }, // 5s → 10s → 20s ...
      removeOnComplete: false,
      removeOnFail: false,
    });
  }
}
