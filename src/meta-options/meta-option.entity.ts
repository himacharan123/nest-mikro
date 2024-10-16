import {
  Cascade,
  Entity,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

import { Post } from '../posts/post.entity';

@Entity()
export class MetaOption {
  @PrimaryKey()
  id!: number;

  @Property({ type: 'json', nullable: false })
  metaValue!: object;

  // Store both date and time using 'datetime'
  @Property({ type: 'datetime', onCreate: () => new Date() })
  createDate!: Date;

  @Property({ type: 'datetime', nullable: true, onUpdate: () => new Date() })
  updateDate?: Date;
  @OneToOne(() => Post, (post) => post.metaOptions, {
    nullable: false, // This field should not be nullable
    orphanRemoval: true,
    cascade: [Cascade.REMOVE],
    owner:true// Automatically delete MetaOption when Post is removed
  })
  post!: Post; // Owning side // Owning side
}
