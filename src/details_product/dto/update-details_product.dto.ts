import { PartialType } from '@nestjs/mapped-types';
import { CreateDetailsProductDto } from './create-details_product.dto';

export class UpdateDetailsProductDto extends PartialType(CreateDetailsProductDto) {}
