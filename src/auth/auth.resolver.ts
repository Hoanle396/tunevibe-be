import {
  BadRequestException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import {
  LoginResult,
  LoginUserInput,
  LoginWithWallet,
} from '../modules/users/dto/users-inputs.dto';
import { Users } from '../schemas/user.schema';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

type Login = {
  user: Users;
  token: string;
};

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => LoginResult)
  async login(@Args('user') user: LoginUserInput): Promise<Login> {
    const result = await this.authService.validateUserByPassword(user);

    if (result) return result;
    throw new BadRequestException(
      'Could not log-in with the provided credentials'
    );
  }

  @Query(() => LoginResult)
  async loginWallet(@Args('user') user: LoginWithWallet): Promise<Login> {
    const result = await this.authService.validateUserByWallet(user);

    if (result) return result;
    throw new BadRequestException(
      'Could not log-in with the provided credentials'
    );
  }

  // There is no username guard here because if the person has the token, they can be any user
  @UseGuards(JwtAuthGuard)
  @Query(() => String)
  async refreshToken(@Context('req') request: any): Promise<string> {
    const user: Users = request.user;
    if (!user)
      throw new UnauthorizedException(
        'Could not log-in with the provided credentials'
      );
    const result = await this.authService.createJwt(user);
    if (result) return result.token;
    throw new UnauthorizedException(
      'Could not log-in with the provided credentials'
    );
  }
}
