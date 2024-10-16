import { registerAs } from '@nestjs/config';

 export interface JwtConfig {
  secret: string;
  signOptions: {
    expiresIn: number;
    audience: string;
    issuer: string;
  };
}

export default registerAs<JwtConfig>('jwt', () => ({
  secret: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: parseInt(process.env.JWT_ACCESS_TOKEN_TTL, 10) || 3600,
    audience: process.env.JWT_AUDIENCE || 'localhost:3000',
    issuer: process.env.JWT_TOKEN_ISSUER || 'localhost:3000',
  },
}));
