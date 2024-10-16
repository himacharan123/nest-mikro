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
import jwtConfig from './auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './auth/guards/acess-token/acess-token.guard';

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
    ConfigModule.forFeature(jwtConfig),JwtModule.registerAsync(jwtConfig.asProvider())
  ],
  providers: [MetaOptionsService
,{
  provide:APP_GUARD,
  useClass:AccessTokenGuard,
}


  ],
})
export class AppModule {}
