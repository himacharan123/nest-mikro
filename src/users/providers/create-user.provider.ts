import {
    BadRequestException,
    Injectable,
    RequestTimeoutException,
    Inject,
    forwardRef,
  } from '@nestjs/common';
  import { CreateUserDto } from '../dtos/create-user.dto';
  import { User } from '../user.entity';
  import { EntityManager } from '@mikro-orm/mysql';
  import { HashingProvider } from 'src/auth/providers/hashing.provider';
  
  @Injectable()
  export class CreateUserProvider {
    constructor(
      /**
       * Injecting EntityManager for MikroORM
       */
      private readonly em: EntityManager,
  
      /**
       * Inject BCrypt Provider
       */
      @Inject(forwardRef(() => HashingProvider))
      private readonly hashingProvider: HashingProvider,
    ) {}
  
    public async createUser(createUserDto: CreateUserDto) {
      let existingUser: User | null;
  
      try {
        // Check if user exists with the same email
        existingUser = await this.em.findOne(User, { email: createUserDto.email });
      } catch (error) {
        // Handle database connection issues
        throw new RequestTimeoutException(
          'Unable to process your request at the moment, please try later.',
          {
            description: 'Error connecting to the database',
          },
        );
      }
  
      // Handle exception for existing user
      if (existingUser) {
        throw new BadRequestException(
          'The user already exists, please check your email.',
        );
      }
  
      // Create a new user
      const hashedPassword = await this.hashingProvider.hashPassword(createUserDto.password);
      const newUser = this.em.create(User, {
        ...createUserDto,
        password: hashedPassword,
      });
  
      try {
        await this.em.persistAndFlush(newUser); // Save the new user
      } catch (error) {
        throw new RequestTimeoutException(
          'Unable to process your request at the moment, please try later.',
          {
            description: 'Error connecting to the database',
          },
        );
      }
  
      return newUser;
    }
  }
  