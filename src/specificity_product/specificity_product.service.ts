import { Injectable } from '@nestjs/common';
import { CreateSpecificityProductDto } from './dto/create-specificity_product.dto';
import { UpdateSpecificityProductDto } from './dto/update-specificity_product.dto';

@Injectable()
export class SpecificityProductService {
  create(createSpecificityProductDto: CreateSpecificityProductDto) {
    return 'This action adds a new specificityProduct';
  }

  findAll() {
    return `This action returns all specificityProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} specificityProduct`;
  }

  update(id: number, updateSpecificityProductDto: UpdateSpecificityProductDto) {
    return `This action updates a #${id} specificityProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} specificityProduct`;
  }
}
