import {
    Entity,
    PrimaryKey,
    Property,
    Unique,
    BeforeCreate,
    BeforeUpdate,
    ManyToMany,
    Collection,
    Cascade,
    
  } from '@mikro-orm/core';
import { Post } from '../posts/post.entity';
  
  @Entity()
  export class Tag {
    @PrimaryKey()
    id!: number; // Use number for auto-incrementing IDs
  
    @Property({ type: 'varchar', length: 256 })
    @Unique()
    name!: string;
  
    @Property({ type: 'varchar', length: 256})
    @Unique()
    slug!: string;
  
    @Property({ type: 'text', nullable: true })
    description?: string;
  
    @Property({ type: 'text', nullable: true })
    schema?: string;
  
    @Property({ type: 'varchar', length: 1024, nullable: true })
    featuredImage?: string;
  

    @ManyToMany(() => Post, post => post.tags, { mappedBy: 'tags', cascade:[Cascade.REMOVE] })
  posts = new Collection<Post>(this);
    @Property({ type: 'datetime' })
    createDate: Date = new Date(); // Default to current date
  
    @Property({ type: 'datetime' })
    updateDate: Date = new Date(); // Default to current date
  
    @Property({ type: 'datetime', nullable: true })
    deletedAt?: Date; // Nullable for soft deletes
  

    // Lifecycle hooks
    @BeforeCreate()
    setCreateDate() {
      this.createDate = new Date();
    }
  
    @BeforeUpdate()
    setUpdateDate() {
      this.updateDate = new Date();
    }
  }
  //https://github.com/mikro-orm/mikro-orm/blob/master/docs/docs/decorators.md