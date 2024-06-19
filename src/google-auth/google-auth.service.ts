import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthProvider } from 'src/auth_providers/entities/auth_provider.entity';
import { In, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class GoogleAuthService {
  constructor(
    private readonly httpservice: HttpService,
    @InjectRepository(AuthProvider)
    private authProviderRepository: Repository<AuthProvider>,
    private usersService: UsersService,
  ) {}

  async authenticate(accessToken: string) {
    // Récuperer les informations
    const { data } = await this.httpservice.get(
      `https://www.googleapis.com/oauth2/v3/userinfo`,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    ).toPromise();

    // Voir si un utilisateur existe sinon le créer
    let user = await this.usersService.findByEmail(data.email);
    if (!user) {
      user = await this.usersService.create({
        name: data.name,
        email: data.email,
      });
    }

    // Voir si un provider existe sinon le créer
    let authProvider = await this.authProviderRepository.findOneBy({
      providerId: data.sub,
    });
    if (!authProvider) {
        authProvider = this.authProviderRepository.create({
            providerName: 'google',
            providerId: data.sub,
            user,
        })
    }
    await this.authProviderRepository.save(authProvider);

    return this.usersService.login({
        email: user.email,
        souvenir: true,
        type: "providers",
    })
  }
}
