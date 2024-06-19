import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: 'mamiotban@gmail.com',
          pass: 'wkjj jqeb ufpn doru',
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
    }),
    PassportModule,
    JwtModule.register({
      secret: 'Xq23h!aY*6Fc8nZ1v9P4e5T7u0i3O2k1j',
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
