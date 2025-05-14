import { Test, TestingModule } from '@nestjs/testing';
import { LocationHolidayController } from './location-holiday.controller';

describe('LocationHolidayController', () => {
  let controller: LocationHolidayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationHolidayController],
    }).compile();

    controller = module.get<LocationHolidayController>(LocationHolidayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
