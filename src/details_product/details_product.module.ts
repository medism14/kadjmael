import { Module } from '@nestjs/common';
import { DetailsProductService } from './details_product.service';
import { DetailsProductController } from './details_product.controller';

@Module({
  controllers: [DetailsProductController],
  providers: [DetailsProductService],
})
export class DetailsProductModule {}
