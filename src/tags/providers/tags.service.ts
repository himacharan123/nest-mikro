
import { EntityManager } from '@mikro-orm/mysql';
import { Injectable } from '@nestjs/common';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { Tag } from '../tag.entity';

@Injectable()
export class TagsService {
 
    constructor(private readonly em: EntityManager){

    }
public async createTag(createTagDto:CreateTagDto){
    let tag= this.em.create(Tag,createTagDto);
    return await this.em .persistAndFlush(tag);
}
public async  findMultipleTags(tags:number[]){
    let results = await this.em.find(Tag, { id: { $in: tags } });
    return results;
}

public async delete(id: number) {
    const tag = await this.em.findOne(Tag, id);
   
    await this.em.removeAndFlush(tag);

    return {
      deleted: true,
      id,
    };
  }
  public async softRemoveALl(id:number){
    const tag = await this.em.findOne(Tag, id);

    if (tag) {
      tag.deletedAt = new Date(); // Mark as soft deleted
      await this.em.flush(); // Persist changes
    }

    return {
      softDeleted: !!tag,
      id,
    };
  }
}

