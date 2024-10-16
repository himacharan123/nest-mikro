import { Injectable, Post } from '@nestjs/common';
import { EntityRepository, EntityManager } from '@mikro-orm/mysql'; // Assuming MySQL is used
import { PaginationQueryDto } from '../dto/pagination-query.dto';
import { MetaOption } from 'src/meta-options/meta-option.entity';

@Injectable()
export class PaginationProvider {
  constructor(private readonly em: EntityManager) {}

  public async paginateQuery<T extends object>(
    paginationQuery: PaginationQueryDto,
    entityManager: EntityManager, // Use EntityManager directly
  ): Promise<T[]> {
    const results = await entityManager.find(
      Post,
       // The entity class (Post in this case)
      {},  // You can modify this filter as needed
      {
        offset: (paginationQuery.page - 1) * paginationQuery.limit,
        limit: paginationQuery.limit,
      },
    );

    return results;
  }
}