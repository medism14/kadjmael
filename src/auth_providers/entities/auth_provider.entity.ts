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

@Entity({ name: 'auth_providers' })
export class AuthProvider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'provider_name', length: 255 })
  providerName: string;

  @Column({ name: 'provider_id' })
  providerId: number;

  @OneToOne(() => User, (user) => user.authProvider)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
