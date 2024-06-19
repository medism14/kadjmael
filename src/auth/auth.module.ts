import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from './auth.middleware';

@Module({
  imports: [
    JwtModule.register({
      secret: 'Xq23h!aY*6Fc8nZ1v9P4e5T7u0i3O2k1j',
    }),
  ],
  providers: [AuthMiddleware],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'users/login', method: RequestMethod.POST },
        { path: 'users', method: RequestMethod.POST },
        { path: 'users/refreshToken', method: RequestMethod.POST },
        { path: 'users/sendMail', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
