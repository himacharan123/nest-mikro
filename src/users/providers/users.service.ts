import {
  Injectable,
  Inject,
  forwardRef,
  RequestTimeoutException,
  BadRequestException,
} from '@nestjs/common';
import { GetUserParamDto } from '../dtos/get-users.dto';
import { EntityManager } from '@mikro-orm/mysql';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';

import { CreateManyProvider } from './create-many.provider';
import { CreateUserProvider } from './create-user.provider';
import { FindOneUserByEmail } from './find-one-user-by-email';
@Injectable()
export class UserService {
  constructor(
    private readonly em: EntityManager,
    private readonly createManyService: CreateManyProvider,
 private readonly createUserProvider:CreateUserProvider,
  
/* 
Inject findOneEmailProvider

*/
private readonly findOneUserByEmail:FindOneUserByEmail
) {}

  // Create User Method
  public async createUser(createUserDto: CreateUserDto) {
    //Check if user all ready exists with same email here we no need use where just pass the enity and property
    //findOne takes two arguments: the entity class (User) and the query conditions ({ email: createUserDto.email }).

   return  await this.createUserProvider.createUser(createUserDto);
  }

  public findAllUsers(
    getUserParamDto: GetUserParamDto,
    limit: number,
    page: number,
  ) {
    return [
      {
        firstname: 'John',
        email: 'hima@123',
      },
      { firstname: 'alice', email: 'charan@123' },
    ];
  }

  public async findOneById(id: number) {
    return await this.em.findOne(User, { id });
  }

  public async findMyId(id: string) {
    const userId = parseInt(id);

    if (isNaN(userId)) {
      throw new Error('Invalid user ID');
    }

    return await this.em.findOne(User, { id: userId });
  }
  public async createManyUsers(
    createUserDto: CreateUserDto[],
  ): Promise<User[]> {
    return await this.createManyService.createManyUsers(createUserDto);
  }

public async findOneByEmail(email:string){
return await this.findOneUserByEmail.findOneByEmail(email);
}

}
