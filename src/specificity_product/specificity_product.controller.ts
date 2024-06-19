import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecificityProductService } from './specificity_product.service';
import { CreateSpecificityProductDto } from './dto/create-specificity_product.dto';
import { UpdateSpecificityProductDto } from './dto/update-specificity_product.dto';

@Controller('specificity-product')
export class SpecificityProductController {
  constructor(private readonly specificityProductService: SpecificityProductService) {}

  @Post()
  create(@Body() createSpecificityProductDto: CreateSpecificityProductDto) {
    return this.specificityProductService.create(createSpecificityProductDto);
  }

  @Get()
  findAll() {
    return this.specificityProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specificityProductService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpecificityProductDto: UpdateSpecificityProductDto) {
    return this.specificityProductService.update(+id, updateSpecificityProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specificityProductService.remove(+id);
  }
}
