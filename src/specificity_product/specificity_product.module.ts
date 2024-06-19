import { Module } from '@nestjs/common';
import { SpecificityProductService } from './specificity_product.service';
import { SpecificityProductController } from './specificity_product.controller';

@Module({
  controllers: [SpecificityProductController],
  providers: [SpecificityProductService],
})
export class SpecificityProductModule {}
