import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthService } from './google-auth.service';
import { Request, Response } from 'express'; // Importer les types Express

@Controller('google')
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) {

  }

  @Get('redirect')
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    try {
      const { accessToken, refreshToken, user } = await this.googleAuthService.authenticate(req.user.accessToken);
      // Redirigez vers votre frontend avec les tokens JWT
      res.redirect(`YOUR_FRONTEND_URL?accessToken=${accessToken}&refreshToken=${refreshToken}`);
    } catch (error) {
      // Gérez les erreurs
      res.redirect('YOUR_FRONTEND_URL_ERROR');
    }
  }

}