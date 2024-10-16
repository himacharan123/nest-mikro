import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/signin.dto';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig, { JwtConfig } from '../config/jwt.config';

@Injectable()
export class SignInProvider {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly hashingProvider: HashingProvider,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig> & JwtConfig, // Ensure this line is correct
  ) {}

  public async signIn(signInDto: SignInDto) {
    // Fetch the user by email
    console.log(`Searching for user with email: ${signInDto.email}`);
    const user = await this.userService.findOneByEmail(signInDto.email);

    // Check if the user exists
    if (!user) {
      console.error(`User with email ${signInDto.email} not found`);
      throw new UnauthorizedException('User not found');
    }

    // Check if the user has a password set
    if (!user.password) {
      console.error(`Password not set for user with email ${signInDto.email}`);
      throw new UnauthorizedException('Password not set for this user');
    }

    // Compare the password
    let isEqual: boolean;
    try {
      isEqual = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      console.error(`Error comparing passwords: ${error.message}`);
      throw new RequestTimeoutException('Error comparing passwords', {
        cause: error,
      });
    }

    // Throw an error if passwords do not match
    if (!isEqual) {
      console.error('Password does not match');
      throw new UnauthorizedException('Incorrect password');
    }

    // Generate JWT access token
    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        audience: this.jwtConfiguration.signOptions.audience, // Ensure you're using the right path
        issuer: this.jwtConfiguration.signOptions.issuer,
        expiresIn: this.jwtConfiguration.signOptions.expiresIn,
        secret: this.jwtConfiguration.secret,
      },
    );

    return { accessToken };
  }
}
