import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UnsubscribeService {
  constructor(private prisma: PrismaService) {}

  async unsubscribe(email: string) {
    const existing = await this.prisma.unsubscribe.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existing) {
      return {
        success: true,
        message: 'Email already unsubscribed',
      };
    }

    await this.prisma.unsubscribe.create({
      data: { email },
    });

    return {
      success: true,
      message: 'Successfully unsubscribed',
    };
  }

  async isUnsubscribed(email: string) {
    const unsubscribed = await this.prisma.unsubscribe.findUnique({
      where: { email },
    });

    return !!unsubscribed;
  }
}
