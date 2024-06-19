import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AdressesModule } from './adresses/adresses.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { SpecificityProductModule } from './specificity_product/specificity_product.module';
import { DetailsProductModule } from './details_product/details_product.module';
import { SearchesModule } from './searches/searches.module';
import { InteractionsModule } from './interactions/interactions.module';
import { OrdersModule } from './orders/orders.module';
import { OrderProductsModule } from './order_products/order_products.module';
import { ConversationsModule } from './conversations/conversations.module';
import { MessagesModule } from './messages/messages.module';
import { ReviewsModule } from './reviews/reviews.module';
import { PaymentsModule } from './payments/payments.module';
import { AuthProvidersModule } from './auth_providers/auth_providers.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        try {
          return {
            type: 'postgres',
            host: configService.get<string>('DB_HOST'),
            port: configService.get<number>('DB_PORT'),
            username: configService.get<string>('DB_USERNAME'),
            password: configService.get<string>('DB_PASSWORD'),
            database: configService.get<string>('DB_NAME'),
            entities: ['dist/**/*.entity.js'],
            synchronize: true,
            migrations: ['dist/db/migration/*.js'],
            };
          } catch (error) {
            console.error('Erreur de connexion à la base de données:', error);
          throw error; 
        }
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    AdressesModule,
    CategoriesModule,
    ProductsModule,
    SpecificityProductModule,
    DetailsProductModule,
    SearchesModule,
    InteractionsModule,
    OrdersModule,
    OrderProductsModule,
    ConversationsModule,
    MessagesModule,
    ReviewsModule,
    PaymentsModule,
    AuthProvidersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
