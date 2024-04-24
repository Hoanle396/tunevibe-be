import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {
  BadRequestException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { Users } from '../schemas/user.schema';
import {
  LoginResult,
  LoginUserInput,
} from '../modules/users/dto/users-inputs.dto';
import { AuthService } from './auth.service';

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
