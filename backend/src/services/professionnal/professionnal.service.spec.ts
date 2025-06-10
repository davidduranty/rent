import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionnalService } from './professionnal.service';

describe('ProfessionnalService', () => {
  let service: ProfessionnalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfessionnalService],
    }).compile();

    service = module.get<ProfessionnalService>(ProfessionnalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
