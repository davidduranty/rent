import { Test, TestingModule } from '@nestjs/testing';
import { LocationHolidayService } from './location-holiday.service';

describe('LocationHolidayService', () => {
  let service: LocationHolidayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationHolidayService],
    }).compile();

    service = module.get<LocationHolidayService>(LocationHolidayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
