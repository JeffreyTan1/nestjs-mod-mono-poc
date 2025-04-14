import { Controller, Get } from '@nestjs/common';
import { DateService } from './common/utils/date/date.service';

export const OK_STATUS = 'ok';

@Controller()
export class AppController {
  constructor(private readonly dateService: DateService) {}

  @Get('health')
  getHealth() {
    return {
      status: OK_STATUS,
      timestamp: this.dateService.getCurrentDate(),
    };
  }
}
