import { forwardRef, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';  // Import MikroOrmModule
import { UsersController } from './users.controller';
import { UserService } from './providers/users.service';
import { User } from './user.entity';  // Import User entity
import { CreateManyProvider } from './providers/create-many.provider';
import { AuthModule } from 'src/auth/auth.module';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneUserByEmail } from './providers/find-one-user-by-email';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/auth/config/jwt.config';
import { ConfigModule } from '@nestjs/config';




@Module({
  controllers: [UsersController],
  providers: [UserService,CreateManyProvider,CreateUserProvider,FindOneUserByEmail],
  imports: [
    forwardRef(() => AuthModule),  // Break circular dependency
    MikroOrmModule.forFeature([User]),
    AuthModule ,
     // Register User entity for MikroORM
  
     ConfigModule.forFeature(jwtConfig),JwtModule.registerAsync(jwtConfig.asProvider())
  
  ],
  exports: [UserService,CreateManyProvider,CreateUserProvider],
})
export class UsersModule {}
