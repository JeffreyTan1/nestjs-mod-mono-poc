import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { DateService } from './common/utils/date/date.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [DateService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should return the health status', () => {
    const result = appController.getHealth();
    expect(result).toEqual({
      status: 'ok',
      timestamp: expect.any(Date) as Date,
    });
  });
});
