import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Tag } from './tag.entity';
import { TagsService } from './providers/tags.service';


@Module({
  providers: [TagsService],
  controllers: [TagsController],
  imports:[MikroOrmModule.forFeature([Tag])],
  exports: [TagsService],
})
export class TagsModule {

}
