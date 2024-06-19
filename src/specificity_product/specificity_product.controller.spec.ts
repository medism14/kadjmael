import { Test, TestingModule } from '@nestjs/testing';
import { SpecificityProductController } from './specificity_product.controller';
import { SpecificityProductService } from './specificity_product.service';

describe('SpecificityProductController', () => {
  let controller: SpecificityProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecificityProductController],
      providers: [SpecificityProductService],
    }).compile();

    controller = module.get<SpecificityProductController>(SpecificityProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
