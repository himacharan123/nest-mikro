import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Post } from '../posts/post.entity';

@Entity()
export class User {
  @PrimaryKey()
  id: number;

  @Property({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  firstname: string;
  @Property({
    type: 'varchar',
    length: 96,
    nullable: true,
  })
  lastname: string;
  

  @Property({
    type: 'varchar',
    length: 96,
    nullable: false,
    unique: true, // database will not take duplicate email
  })
  email: string;

  @Property({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  password: string;
  @OneToMany(() => Post, (post) => post.author)
  posts = new Collection<Post>(this);
}
