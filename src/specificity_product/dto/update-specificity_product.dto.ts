import { PartialType } from '@nestjs/mapped-types';
import { CreateSpecificityProductDto } from './create-specificity_product.dto';

export class UpdateSpecificityProductDto extends PartialType(CreateSpecificityProductDto) {}
