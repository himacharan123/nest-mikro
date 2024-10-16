import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from 'src/auth/config/jwt.config';
import { Request } from 'express';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constant';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    /*
    Injecting JwtService
    */
    private readonly jwtService: JwtService,
    
    /* 
    Injecting JWT Configuration
    */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Extract the request from the execution context
    const request = context.switchToHttp().getRequest();
    
    // Extract the token from the header
    const token = this.extractTokenFromHeader(request);
    
    // If no token is found, throw an UnauthorizedException
    if (!token) {
      throw new UnauthorizedException('Token not found in the header');
    }

    try {
      // Verify the token using JwtService
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.jwtConfiguration.secret, // Use the configured secret
      });

      // Attach the decoded token payload to the request object (optional)
      request[REQUEST_USER_KEY] = payload;

      // Optional: log the payload for debugging purposes
      console.log('Token payload:', payload);

      return true; // Token is valid
    } catch (error) {
      // Catch any error thrown by verifyAsync and handle it
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    // Extract the token from the Authorization header (Bearer token)
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}
