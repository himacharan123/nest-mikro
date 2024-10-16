import { EntityManager } from '@mikro-orm/mysql';
import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../user.entity';

@Injectable()
export class FindOneUserByEmail {
  /* 
Inject repository

*/

  constructor(private readonly em: EntityManager) {}
  public async findOneByEmail(email: string) {
    let user: User | undefined = undefined;
    try {
      // EntityManager can be used to fetch entities directly
      user = await this.em.findOne(User, { email: email });
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Could not fetch the user',
      });
    }

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    return user;
  }
}
