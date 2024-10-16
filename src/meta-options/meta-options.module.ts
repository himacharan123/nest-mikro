import { Module } from '@nestjs/common';
import { MetaOptionsController } from './meta-options.controller';
import { MetaOptionsService } from './provider/meta-options.service';
import { Post } from '../posts/post.entity';
@Module({
  controllers: [MetaOptionsController],
  providers: [MetaOptionsService],
  imports: [Post],
})
export class MetaOptionsModule {
  
}
