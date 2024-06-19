import { Test, TestingModule } from '@nestjs/testing';
import { SpecificityProductService } from './specificity_product.service';

describe('SpecificityProductService', () => {
  let service: SpecificityProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecificityProductService],
    }).compile();

    service = module.get<SpecificityProductService>(SpecificityProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
