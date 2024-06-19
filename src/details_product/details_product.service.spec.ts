import { Test, TestingModule } from '@nestjs/testing';
import { DetailsProductService } from './details_product.service';

describe('DetailsProductService', () => {
  let service: DetailsProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailsProductService],
    }).compile();

    service = module.get<DetailsProductService>(DetailsProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
