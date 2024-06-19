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

enum InteractionType {
  // Interactions avec les produits
  PRODUCT_VIEW = 'product_view',
  PRODUCT_ADD_TO_CART = 'product_add_to_cart',
  PRODUCT_REMOVE_FROM_CART = 'product_remove_from_cart',
  PRODUCT_PURCHASE = 'product_purchase',
  PRODUCT_WRITE_REVIEW = 'product_write_review',
  PRODUCT_RATE = 'product_rate',

  // Interactions avec les catégories
  CATEGORY_VIEW = 'category_view',
  CATEGORY_FILTER = 'category_filter',
  CATEGORY_SORT = 'category_sort',

  // Interactions avec le panier
  CART_VIEW = 'cart_view',
  CART_UPDATE_QUANTITY = 'cart_update_quantity',
  CART_EMPTY = 'cart_empty',
  CART_START_CHECKOUT = 'cart_start_checkout',

  // Interactions avec les commandes
  ORDER_COMPLETE_CHECKOUT = 'order_complete_checkout',
  ORDER_TRACK = 'order_track',
  ORDER_CANCEL = 'order_cancel',

  // Interactions avec le compte utilisateur
  USER_CREATE_ACCOUNT = 'user_create_account',
  USER_LOGIN = 'user_login',
  USER_LOGOUT = 'user_logout',
  USER_UPDATE_PROFILE = 'user_update_profile',
  USER_CHANGE_PASSWORD = 'user_change_password',

  // Interactions avec les recherches
  SEARCH_QUERY = 'search_query', // Nouvelle valeur
  SEARCH_FILTER_RESULTS = 'search_filter_results',
  SEARCH_SORT_RESULTS = 'search_sort_results',
}

@Entity({ name: 'interactions' })
export class Interaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'interaction_type',
    type: 'enum',
    enumName: 'interaction_type_user',
    enum: InteractionType,
  })
  interactionType: InteractionType;

  @Column({ name: 'interaction_id' })
  interactionId: number;


  @ManyToOne(() => User, (user) => user.interactions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
