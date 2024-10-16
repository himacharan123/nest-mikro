// app.module.ts
import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UsersModule } from './users/users.module';
import mikroOrmConfig from '../mikro-orm.config';  // Correct import statement
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import {ConfigModule  } from "@nestjs/config";
import { MetaOptionsService } from '../src/meta-options/provider/meta-options.service';
import { PostsModule } from './posts/posts.module';
import { PaginationModule } from './common/pagination/pagination.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),  // Use the MikroORM config directly
    UsersModule,
    TagsModule,
    PostsModule,
    MetaOptionsModule,
    PaginationModule,
    ConfigModule.forRoot(
      { isGlobal:true}
    ),
  ],
  providers: [MetaOptionsService],
})
export class AppModule {}
