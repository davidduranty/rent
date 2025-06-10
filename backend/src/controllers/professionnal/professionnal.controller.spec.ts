import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionnalController } from './professionnal.controller';

describe('ProfessionnalController', () => {
  let controller: ProfessionnalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfessionnalController],
    }).compile();

    controller = module.get<ProfessionnalController>(ProfessionnalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
