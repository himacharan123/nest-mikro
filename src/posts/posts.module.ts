import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';

import { PostsService } from './providers/posts.service';

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Post } from './post.entity';
import { User } from '../users/user.entity';
import { MetaOption } from '../meta-options/meta-option.entity';

import { UserService } from '../users/providers/users.service';
import { TagsModule } from '../tags/tags.module';
import { CreateManyProvider } from '../users/providers/create-many.provider';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { UsersModule } from 'src/users/users.module';
import { FindOneUserByEmail } from 'src/users/providers/find-one-user-by-email';


@Module({
  controllers: [PostsController],
  providers: [PostsService,UserService,CreateManyProvider,FindOneUserByEmail],
  imports: [PaginationModule,User,UsersModule,TagsModule,MikroOrmModule.forFeature([Post, MetaOption, User])],
})
export class PostsModule {}
