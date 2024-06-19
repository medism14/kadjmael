import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      //Extraire le token de l'authorization
      const authHeaders = req.headers.authorization;

      if (!authHeaders) {
        throw new UnauthorizedException('Token manquant');
      }

      const [type, token] = authHeaders.split(' ');
      if (type !== 'Bearer') {
        throw new UnauthorizedException("Le type de token n'est pas valide");
      }

      //Verifier le token
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'Xq23h!aY*6Fc8nZ1v9P4e5T7u0i3O2k1j',
      });

      //Stocker l'utilisateur
      req.user = payload as User; 

      next();
    } catch (error) {
      throw new UnauthorizedException('Token invalide ou expiré');
    }
  }
}
