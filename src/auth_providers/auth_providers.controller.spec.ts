import { Test, TestingModule } from '@nestjs/testing';
import { AuthProvidersController } from './auth_providers.controller';
import { AuthProvidersService } from './auth_providers.service';

describe('AuthProvidersController', () => {
  let controller: AuthProvidersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthProvidersController],
      providers: [AuthProvidersService],
    }).compile();

    controller = module.get<AuthProvidersController>(AuthProvidersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
