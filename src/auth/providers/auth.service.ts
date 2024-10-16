import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UserService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/signin.dto';
import { SignInProvider } from './sign-in.provider';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly signProvider: SignInProvider,
  ) {}
  public async  signIn(signInDto: SignInDto) {
return await this.signProvider.signIn(signInDto);
  }
  public isAuth() {
    return true;
  }
}
