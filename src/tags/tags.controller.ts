import { Body, Controller, Delete, ParseIntPipe, Post, Query } from '@nestjs/common';
import { TagsService } from './providers/tags.service';
import { CreateTagDto } from './dtos/create-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  @Post()
  public async createTag(@Body() createTagDto: CreateTagDto) {
    return await this.tagService.createTag(createTagDto);
  }
  @Delete()
  public async delete(@Query('id',ParseIntPipe)id: number) {
    return this.tagService.delete(id);
  }
  @Delete("soft-delete")
  public async softDelete(@Query('id',ParseIntPipe)id: number) {
    return this.tagService.softRemoveALl(id);
  }
}
