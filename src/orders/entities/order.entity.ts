import { Adress } from 'src/adresses/entities/adress.entity';
import { OrderProduct } from 'src/order_products/entities/order_product.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { User } from 'src/users/entities/user.entity';
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

enum PaymentMethod {
  CARTE_BANCAIRE = 'carte bancaire',
  Livraison = 'livraison',
  WAAFI = 'waafi',
  DMONEY = 'd-money',
}

enum Status {
  EN_COURS = 'En Cours',
  EN_LIVRAISON = 'En Livraison',
  ANNULE = 'Annulé',
}

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'tracking_number', length: 255 })
  trackingNumber: string;

  @Column({ name: 'date' })
  date: Date;

  @Column({ name: 'total_price' })
  totalPrice: number;

  @Column({
    name: 'payment_method',
    type: 'enum',
    enumName: 'payment_method_order',
    enum: PaymentMethod,
  })
  paymentMethod: PaymentMethod;

  @Column({
    name: 'status',
    type: 'enum',
    enumName: 'status_order',
    enum: Status,
  })
  status: Status;

  @Column({ name: 'delivery_date' })
  deliveryDate: Date;

  @Column({
    name: 'supplements_number',
    type: 'int',
    array: true,
    default: () => "'{}'",
  })
  supplementsNumber: number[];

  @ManyToOne(() => Adress, (adress) => adress.orders)
  @JoinColumn({ name: 'adress_id' })
  adress: Adress;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  orderProducts: OrderProduct[];

  @OneToOne(() => Payment, (payment) => payment.order)
  payment: Payment;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
