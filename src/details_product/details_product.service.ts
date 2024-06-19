import { Injectable } from '@nestjs/common';
import { CreateDetailsProductDto } from './dto/create-details_product.dto';
import { UpdateDetailsProductDto } from './dto/update-details_product.dto';

@Injectable()
export class DetailsProductService {
  create(createDetailsProductDto: CreateDetailsProductDto) {
    return 'This action adds a new detailsProduct';
  }

  findAll() {
    return `This action returns all detailsProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detailsProduct`;
  }

  update(id: number, updateDetailsProductDto: UpdateDetailsProductDto) {
    return `This action updates a #${id} detailsProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} detailsProduct`;
  }
}
