import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UnsubscribeService } from 'src/unsubscribe/unsubscribe.service';

@Injectable()
export class EmailTrackingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly unsubscribeService: UnsubscribeService,
  ) {}

  async processEvents(events: any[]) {
    for (const event of events) {
      const mappedType = this.mapEvent(event.event);

      if (!mappedType) continue;

      // Auto-unsubscribe bounced or complaint emails
      if (mappedType === 'BOUNCED' || mappedType === 'COMPLAINT') {
        await this.unsubscribeService.unsubscribe(event.email);
      }

      await this.prisma.emailEvent.create({
        data: {
          email: event.email,
          messageId: event.sg_message_id || null,
          type: mappedType,
          metadata: event,
        },
      });
    }

    return { success: true };
  }

  private mapEvent(event: string) {
    switch (event) {
      case 'delivered':
        return 'DELIVERED';

      case 'open':
        return 'OPENED';

      case 'click':
        return 'CLICKED';

      case 'bounce':
        return 'BOUNCED';

      case 'spamreport':
        return 'COMPLAINT';

      default:
        return null;
    }
  }
}
