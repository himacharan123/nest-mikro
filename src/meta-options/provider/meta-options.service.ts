import { Injectable } from '@nestjs/common';
import { CreatePostMetaOptionsDto } from '../dtos/create-post-meta-options.dto';
import { EntityManager } from '@mikro-orm/mysql';
import { MetaOption } from '../meta-option.entity';

@Injectable()
export class MetaOptionsService {
  constructor(private readonly em: EntityManager) {}
  public async create(createMetaOPtionsDto: CreatePostMetaOptionsDto) {
    let metaOption = this.em.create(MetaOption, createMetaOPtionsDto);
    return await this.em.persistAndFlush(metaOption);
  }
}
