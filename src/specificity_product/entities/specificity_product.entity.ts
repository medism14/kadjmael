import { Product } from 'src/products/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';

@Entity({ name: 'specificity_product' })
export class SpecificityProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 100 })
  name: string;

  @Column({
    name: 'type',
    type: 'enum',
    enumName: 'product_type',
    enum: ['couleur', 'autres'],
  })
  type: 'couleur' | 'autres';

  @Column({ name: 'data', type: 'jsonb' })
  data: any;

  @ManyToOne(() => Product, (product) => product.specificities)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
