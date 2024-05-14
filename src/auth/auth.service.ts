import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../config/config.service';
import {
  LoginResult,
  LoginUserInput,
  LoginWithWallet,
} from '../modules/users/dto/users-inputs.dto';
import { UsersService } from '../modules/users/users.service';
import { Users } from '../schemas/user.schema';
import { JwtPayload } from './interfaces/jwt-payload.interfaces';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private _usersService: UsersService,
    private _jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async validateUserByPassword(
    loginAttempt: LoginUserInput
  ): Promise<LoginResult | undefined> {
    // This will be used for the initial login
    let userToAttempt: Users | undefined;
    if (loginAttempt.email) {
      userToAttempt = await this._usersService.findOneByEmail(
        loginAttempt.email
      );
    }

    // If the user is not enabled, disable log in - the token wouldn't work anyways
    if (userToAttempt && userToAttempt.enabled === false)
      userToAttempt = undefined;

    if (!userToAttempt) return undefined;

    // Check the supplied password against the hash stored for this email address
    let isMatch = false;
    try {
      isMatch = await userToAttempt.checkPassword(loginAttempt.password);
    } catch (error) {
      return undefined;
    }

    if (isMatch) {
      // If there is a successful match, generate a JWT for the user
      const token = this.createJwt(userToAttempt!).token;
      const result: LoginResult = {
        user: userToAttempt!,
        token,
      };
      return result;
    }

    return undefined;
  }
  async validateUserByWallet({
    wallet,
  }: LoginWithWallet): Promise<LoginResult | undefined> {
    // This will be used for the initial login
    let userToAttempt: Users | undefined;
    if (wallet) {
      userToAttempt = await this._usersService.findOneByWallet(wallet);
    }

    // If the user is not enabled, disable log in - the token wouldn't work anyways
    if (userToAttempt && userToAttempt.enabled === false)
      userToAttempt = undefined;

    if (!userToAttempt) return undefined;

    // If there is a successful match, generate a JWT for the user
    const token = this.createJwt(userToAttempt!).token;
    const result: LoginResult = {
      user: userToAttempt!,
      token,
    };
    return result;
  }
  async validateJwtPayload(payload: JwtPayload): Promise<Users | undefined> {
    // This will be used when the user has already logged in and has a JWT
    const user = await this._usersService.findOneByEmail(payload.email);

    // Ensure the user exists and their account isn't disabled
    if (user) {
      return user;
    }

    return undefined;
  }

  createJwt(user: Users): { data: JwtPayload; token: string } {
    const expiresIn = this.configService.jwtExpiresIn;
    let expiration: Date | undefined;
    if (expiresIn) {
      expiration = new Date();
      expiration.setTime(expiration.getTime() + expiresIn * 1000);
    }
    const data: JwtPayload = {
      email: user.email,
      id: user.id,
      expiration,
    };

    const jwt = this._jwtService.sign(data);

    return {
      data,
      token: jwt,
    };
  }
}
