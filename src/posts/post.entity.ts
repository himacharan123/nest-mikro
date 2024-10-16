import {
  Entity,
  PrimaryKey,
  Property,
  Enum,
  OneToOne,
  Cascade,
  ManyToOne,
  ManyToMany,
  Collection,
} from '@mikro-orm/core';
import { postType } from './enums/postType.enum';
import { postStatus } from './enums/postStatus.enum';
import { MetaOption } from '../meta-options/meta-option.entity';
import { User } from '../users/user.entity';
import { Tag } from '../tags/tag.entity';

@Entity()
export class Post {
  @PrimaryKey()
  id: number;

  @Property({ type: 'varchar', length: 512, nullable: false })
  title: string;

  @Enum(() => postType)
  postType: postType = postType.POST;

  @Property({ type: 'varchar', length: 256, nullable: false, unique: true })
  slug: string;

  @Enum(() => postStatus)
  status: postStatus = postStatus.DRAFT;

  @Property({ type: 'text', nullable: true })
  content?: string;

  @Property({ type: 'text', nullable: true })
  schema?: string;

  @Property({ type: 'varchar', length: 1024, nullable: true })
  featuredImageUrl?: string;

  @Property({ type: 'datetime', nullable: true })
  publishedOn?: Date;

 
  @OneToOne(() => MetaOption, { nullable: true, cascade: [Cascade.ALL] ,mappedBy:'post'})
  metaOptions?: MetaOption; // Inverse side
 
  @ManyToOne(() => User, { nullable: false,eager:true })
  author!: User;
  @ManyToMany(() => Tag, tag => tag.posts,{owner:true})
  tags = new Collection<Tag>(this);
}
