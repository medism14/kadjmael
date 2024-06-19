import { Module } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { GoogleAuthController } from './google-auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthProvider } from 'src/auth_providers/entities/auth_provider.entity';
import { User } from '../users/entities/user.entity'; // Importez l'entité User
import { UsersService } from '../users/users.service'; // Importez le service UsersService
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthProvider, User]),
    PassportModule.register({ defaultStrategy: 'google' }),
  ],
  controllers: [GoogleAuthController],
  providers: [GoogleAuthService, UsersService],
})
export class GoogleAuthModule {}
