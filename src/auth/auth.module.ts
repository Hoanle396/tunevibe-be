import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '../config/config.module';
import { UsersModule } from '../modules/users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });
@Module({
  imports: [
    forwardRef(() => UsersModule),
    passportModule,
    JwtModule.register({
      secret: 'SECRET',
      signOptions: {
        expiresIn: '3600s',
      },
    }),
    ConfigModule,
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [AuthService, passportModule],
})
export class AuthModule {}
