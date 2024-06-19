import { Order } from 'src/orders/entities/order.entity';
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

@Entity({ name: 'order_products ' })
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'quantity' })
  quantity: number;

  @Column({ name: 'price_at_purchase' })
  priceAtPurchase: number;

  @Column({ name: 'product_id' })
  productId: number;

  @Column({ name: 'order_id' })
  orderId: number;

  @ManyToOne(() => Product, (product) => product.orderProducts)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderProducts)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
