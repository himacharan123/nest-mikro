import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UsersModule } from '../users/users.module';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import { SignInProvider } from './providers/sign-in.provider';
import { FindOneUserByEmail } from 'src/users/providers/find-one-user-by-email';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    SignInProvider,
    FindOneUserByEmail,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
  ],
  imports: [forwardRef(() => UsersModule),ConfigModule.forFeature(jwtConfig),JwtModule.registerAsync(jwtConfig.asProvider())],
  exports: [AuthService, HashingProvider, FindOneUserByEmail, SignInProvider],
})
export class AuthModule {}
