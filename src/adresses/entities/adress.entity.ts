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
  Timestamp,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Order } from 'src/orders/entities/order.entity';

@Entity({ name: 'addresses' })
export class Adress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'localisation', length: 255 })
  localisation: string;

  @Column({ name: 'district', length: 255 })
  district: string;

  @Column({ name: 'street', length: 255, nullable: true })
  street: string;

  @Column({ name: 'house_no', length: 255, nullable: true })
  houseNo: string;

  @Column({ name: 'landmark', length: 255 })
  landmark: string;

  @Column({ name: 'phone_number' })
  phoneNumber: number;

  @Column({ name: 'by_default' })
  byDefault: boolean;

  @ManyToOne(() => User, (users) => users.adresses)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Order, (order) => order.adress)
  orders: Order[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
