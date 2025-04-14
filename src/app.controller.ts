import { Controller, Get } from '@nestjs/common';
import { DateService } from './common/utils/date/date.service';

@Controller()
export class AppController {
  constructor(private readonly dateService: DateService) {}

  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      timestamp: this.dateService.getCurrentDate(),
    };
  }
}
