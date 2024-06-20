import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { AuthProvider } from 'src/auth_providers/entities/auth_provider.entity';
import { ProviderDto } from './dto/provider-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(AuthProvider)
    private authProviderRepository: Repository<AuthProvider>,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const verification = {
      emailToken: null,
      passwordToken: null,
    };

    const ifExistingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (ifExistingUser) {
      throw new HttpException('Cet email existe déjà', HttpStatus.CONFLICT);
    }

    const user = this.userRepository.create({
      ...createUserDto,
      verification: verification,
    });

    if (createUserDto.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    return await this.userRepository.save(user);
  }

  async createAuthProvider(createAuthProvider: {
    providerName: string;
    providerId: string;
    user: User;
  }) {
    const authProvider = this.authProviderRepository.create(createAuthProvider);

    return await this.authProviderRepository.save(authProvider);
  }

  async sendMail(email: string, type: string) {
    try {
      let subject: string;
      let html: string;

      const user = await this.userRepository.findOneBy({ email });

      if (!user) {
        throw new HttpException(
          "Un utilisateur avec ce mail n'a pas été trouvé",
          HttpStatus.NOT_FOUND,
        );
      }

      if (type == 'passwordForget') {
        const resetToken = this.generateToken(user);
        const resetUrl = `http://votre_application/reset-password/${resetToken}`;

        subject = 'Réinitialisation de votre mot de passe';
        html = `
          <p>Bonjour ${user.name}</p>
          <p>Vous avez demandé à réinitialiser votre mot de passe.</p>
          <p>Veuillez cliquer sur le lien suivant pour choisir un nouveau mot de passe :</p>
          <p><a href="${resetUrl}">${resetUrl}</a></p>
        `;
      } else if (type === 'emailConfirmation') {
        const confirmToken = this.generateToken(user);
        const confirmUrl = `http://votre_application/confirm-email/${confirmToken}`;

        subject = 'Bienvenue sur notre site ! Confirmez votre email';
        html = `
          <p>Bonjour ${user.name},</p>
          <p>Veuillez cliquer sur le lien suivant pour confirmer votre email :</p>
          <p><a href="${confirmUrl}">${confirmUrl}</a></p>
        `;
      } else {
        throw new HttpException(
          "Type d'email invalide",
          HttpStatus.NOT_ACCEPTABLE,
        );
      }

      await this.mailerService.sendMail({
        to: user.email,
        subject: subject,
        html: html,
      });

      return { message: 'Email envoyé avec succès' };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password, souvenir, type } = loginUserDto;

    if (type == 'providers') {
      const user = await this.findByEmail(email);

      if (!user) {
        throw new NotFoundException('Utilisateur non trouvé');
      }

      const payload = { email: user.email, sub: user.id, souvenir };

      const accessToken = this.jwtService.sign(payload, { expiresIn: '30m' });

      let refreshToken: string;

      if (souvenir) {
        refreshToken = this.jwtService.sign(payload, { expiresIn: '365d' });
      } else {
        refreshToken = this.jwtService.sign(payload, { expiresIn: '1d' });
      }

      user.refreshToken = refreshToken;
      this.userRepository.save(user);

      return { accessToken, refreshToken, user };
    } else {
      //Verification de l'utilisateur
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        throw new HttpException('Utilisateur non trouvé', HttpStatus.NOT_FOUND);
      }

      const hashedPassword = user.password;
      const isMatch = await bcrypt.compare(password, hashedPassword);

      if (!isMatch) {
        throw new HttpException(
          'Les mots de passe ne sont pas identiques',
          HttpStatus.UNAUTHORIZED,
        );
      }

      //Generation du token
      const payload = { email: user.email, sub: user.id, souvenir };

      const accessToken = this.jwtService.sign(payload, { expiresIn: '30m' });

      let refreshToken: string;
      if (souvenir) {
        refreshToken = this.jwtService.sign(payload, { expiresIn: '365d' });
      } else {
        refreshToken = this.jwtService.sign(payload, { expiresIn: '1d' });
      }

      //Enregistrement du refresh token dans l'utilisateur
      user.refreshToken = refreshToken;
      await this.userRepository.save(user);

      return { accessToken, refreshToken, user };
    }
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verify(refreshToken, {
        secret: 'Xq23h!aY*6Fc8nZ1v9P4e5T7u0i3O2k1j',
      });

      const user = await this.userRepository.findOneBy({
        id: payload.sub,
        refreshToken,
      });

      if (!user) {
        throw new HttpException(
          'Refresh token invalide ou utilisateur non trouvé',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const newPayload = {
        email: user.email,
        sub: user.id,
        souvenir: payload.souvenir,
      };

      const newAccessToken = this.jwtService.sign(newPayload, {
        expiresIn: '30m',
      });

      let newRefreshToken: any;
      if (newPayload.souvenir) {
        newRefreshToken = this.jwtService.sign(newPayload, {
          expiresIn: '365d',
        });
      } else {
        newRefreshToken = this.jwtService.sign(newPayload, { expiresIn: '1d' });
      }

      user.refreshToken = newRefreshToken;
      await this.userRepository.save(user);

      return { newAccessToken, newRefreshToken };
    } catch (error) {
      // Gestion des erreurs
      if (error instanceof TokenExpiredError) {
        // Refresh token expiré
        throw new UnauthorizedException('Refresh token expiré');
      } else if (error instanceof JsonWebTokenError) {
        // Refresh token invalide
        throw new UnauthorizedException('Refresh token invalide');
      } else {
        // Autre erreur (par exemple, problème de base de données)
        throw new InternalServerErrorException(
          'Erreur lors du rafraîchissement du token',
        );
      }
    }
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async generateToken(user: User) {
    const payload = { id: user.id, email: user.email };
    return this.jwtService.sign(payload, { expiresIn: '1d' });
  }

  async findOne(id: number) {
    return await this.userRepository.findBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('Utilisateur non trouvé', HttpStatus.BAD_REQUEST);
    }

    if (updateUserDto.name) {
      user.name = updateUserDto.name;
    }

    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }

    if (updateUserDto.password) {
      user.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (user) {
      await this.userRepository.delete(id);
      return user;
    } else {
      throw new HttpException('Utilisateur non trouvé', HttpStatus.BAD_REQUEST);
    }
  }
}
