import { Body, Controller, Post } from '@nestjs/common';
import { UnsubscribeService } from './unsubscribe.service';
import { UnsubscribeDto } from '../email/dto/unsubscribe.dto';

@Controller('emails')
export class UnsubscribeController {
  constructor(private readonly unsubscribeService: UnsubscribeService) {}

  @Post('unsubscribe')
  unsubscribe(@Body() dto: UnsubscribeDto) {
    return this.unsubscribeService.unsubscribe(dto.email);
  }
}
