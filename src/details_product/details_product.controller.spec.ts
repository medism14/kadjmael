import { Test, TestingModule } from '@nestjs/testing';
import { DetailsProductController } from './details_product.controller';
import { DetailsProductService } from './details_product.service';

describe('DetailsProductController', () => {
  let controller: DetailsProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailsProductController],
      providers: [DetailsProductService],
    }).compile();

    controller = module.get<DetailsProductController>(DetailsProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
