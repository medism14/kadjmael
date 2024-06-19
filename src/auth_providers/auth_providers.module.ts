import { Module } from '@nestjs/common';
import { AuthProvidersService } from './auth_providers.service';
import { AuthProvidersController } from './auth_providers.controller';

@Module({
  controllers: [AuthProvidersController],
  providers: [AuthProvidersService],
})
export class AuthProvidersModule {}
