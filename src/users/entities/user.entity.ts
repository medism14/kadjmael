import { Adress } from 'src/adresses/entities/adress.entity';
import { AuthProvider } from 'src/auth_providers/entities/auth_provider.entity';
import { Conversation } from 'src/conversations/entities/conversation.entity';
import { Interaction } from 'src/interactions/entities/interaction.entity';
import { Message } from 'src/messages/entities/message.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Product } from 'src/products/entities/product.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Search } from 'src/searches/entities/search.entity';
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

interface Verification {
  emailToken: string | null;
  passwordToken: string | null;
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 100, })
  name: string;

  @Column({ name: 'email', length: 255, unique: true })
  email: string;

  @Column({ name: 'password', length: 255, nullable: true })
  password: string;

  @Column({ name: 'role', default: 2 })
  role: number;

  @Column({
    name: 'profile_picture_path ',
    default: 'default.jpg',
    length: 255,
    nullable: true
  })
  profilPicturePath: string;

  @Column({ name: 'verified_email', default: false })
  verifiedEmail: boolean;

  @Column({ name: 'verification', type: 'jsonb' })
  verification: Verification;

  @Column({ name: 'last_login', default: () => 'CURRENT_TIMESTAMP' })
  lastLogin: Date;

  @Column({ name: 'refresh_token', nullable: true })
  refreshToken: string;

  @OneToMany(() => Adress, (adresses) => adresses.user)
  adresses: Adress[];

  @OneToMany(() => Product, (product) => product.seller)
  products: Product[];

  @OneToMany(() => Search, (search) => search.user)
  searches: Search[];

  @OneToMany(() => Interaction, (interaction) => interaction.user)
  interactions: Interaction[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Conversation, (conversation) => conversation.sender)
  senderConversations: Conversation[];

  @OneToMany(() => Conversation, (conversation) => conversation.receiver)
  receiverConversations: Conversation[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @OneToMany(() => Payment, (paymentPayment) => paymentPayment.user)
  payments: Payment[];

  @OneToOne(() => AuthProvider, (authProvider) => authProvider.user)
  authProvider: AuthProvider;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
