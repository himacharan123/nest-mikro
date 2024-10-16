import { Body, Controller,HttpCode,HttpStatus,Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dtos/signin.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

@Post('sign-in')
@HttpCode(HttpStatus.OK)
public async signIn(@Body()signDto:SignInDto){
return this.authService.signIn(signDto);
}

}
