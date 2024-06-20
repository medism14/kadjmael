import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { ProviderDto } from './dto/provider-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const user = await this.usersService.create(createUserDto);
      return res
        .status(200)
        .json({ message: "L'utilisateur a bien été créé", user });
    } catch (error) {
      throw error;
    }
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    try {
      const { accessToken, refreshToken, user } =
        await this.usersService.login(loginUserDto);
      return res.status(200).json({ accessToken, refreshToken, user });
    } catch (error) {
      throw error;
    }
  }

  @Post('/provider')
  async google(@Body() providerDto: ProviderDto, @Res() res: Response) {
    try {
      const userExist = await this.usersService.findByEmail(providerDto.email);

      //Enregistrement de l'utilisateur s'il n'existe pas
      if (!userExist) {
        const createUserDto = {
          name: providerDto.name,
          email: providerDto.email,
        };

        const user = await this.usersService.create(createUserDto);

        const createAuthProvider = {
          providerName: providerDto.provider_name,
          providerId: providerDto.provider_id,
          user: user,
        };

        await this.usersService.createAuthProvider(createAuthProvider);
      }

      //Connexion de l'utilisateur
      const loginUserDto = {
        email: userExist.email,
        souvenir: true,
        type: 'providers',
      };

      const { accessToken, refreshToken, user } =
        await this.usersService.login(loginUserDto);
      return res.status(200).json({ accessToken, refreshToken, user });
    } catch (error) {
      throw error;
    }
  }

  @Post('/refreshToken')
  async refreshToken(@Body() { refreshToken }: { refreshToken: string }) {
    try {
      const { newAccessToken, newRefreshToken } =
        await this.usersService.refreshToken(refreshToken);
      return { newAccessToken, newRefreshToken };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Post('/sendMail')
  async sendMail(@Body() { email, type }: { email: string; type: string }) {
    try {
      return await this.usersService.sendMail(email, type);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const result = await this.usersService.findAll();
      return res
        .status(200)
        .json({ message: 'Les utilisateurs ont bien été récuperés', result });
    } catch (error) {
      throw error;
    }
  }

  @Get('/all')
  async findAlls(@Res() res: Response) {
    try {
      const result = await this.usersService.findAll();
      return res
        .status(200)
        .json({ message: 'Les utilisateurs ont bien été récuperés', result });
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const user = await this.usersService.findOne(+id);
      return res
        .status(200)
        .json({ message: "L'utilisateur a bien été trouvé", user });
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    try {
      const user = await this.usersService.update(+id, updateUserDto);
      return res
        .status(200)
        .json({ message: "L'utilisateur a bien été modifié", user });
    } catch (error) {
      throw error;
    }
  }

  @Post('/verifyToken')
  async verifyToken(@Body() { token }: { token: string }) {
    try {
      return jwt.verify(token, 'Xq23h!aY*6Fc8nZ1v9P4e5T7u0i3O2k1j');
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const user = await this.usersService.remove(+id);
      return res
        .status(200)
        .json({ message: "L'utilisateur a bien été supprimé", user });
    } catch (error) {
      throw error;
    }
  }
}
