import { Injectable } from '@nestjs/common';

@Injectable()
export class DateService {
  getCurrentDate(): Date {
    return new Date();
  }
}
