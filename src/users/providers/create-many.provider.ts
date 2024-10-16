import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { EntityManager } from '@mikro-orm/mysql';

@Injectable()
export class CreateManyProvider {
  constructor(private readonly em: EntityManager) {}

  public async createManyUsers(
    createUserDto: CreateUserDto[],
  ): Promise<User[]> {
    // Step 1: Convert plain objects to instances of the class and validate
    const users = createUserDto.map((dto) =>
      plainToInstance(CreateUserDto, dto),
    );

    // Step 2: Validate each user DTO (it will throw an exception if invalid)
    for (const user of users) {
      await validateOrReject(user); // This ensures that nested objects are validated
    }

    // Step 3: Create user entities
    const userEntities = users.map((userDto) => this.em.create(User, userDto));

    // Step 4: Use a transaction to persist the users
    return await this.em.transactional(async (transactionEm) => {
      await transactionEm.persistAndFlush(userEntities);
      return userEntities;
    });
  }
}
