import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetailsProductService } from './details_product.service';
import { CreateDetailsProductDto } from './dto/create-details_product.dto';
import { UpdateDetailsProductDto } from './dto/update-details_product.dto';

@Controller('details-product')
export class DetailsProductController {
  constructor(private readonly detailsProductService: DetailsProductService) {}

  @Post()
  create(@Body() createDetailsProductDto: CreateDetailsProductDto) {
    return this.detailsProductService.create(createDetailsProductDto);
  }

  @Get()
  findAll() {
    return this.detailsProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detailsProductService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetailsProductDto: UpdateDetailsProductDto) {
    return this.detailsProductService.update(+id, updateDetailsProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailsProductService.remove(+id);
  }
}
