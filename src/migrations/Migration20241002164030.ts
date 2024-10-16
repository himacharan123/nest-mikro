import { Migration } from '@mikro-orm/migrations';

export class Migration20241002164030 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`tag\` (\`id\` int unsigned not null auto_increment primary key, \`name\` varchar(256) not null, \`slug\` varchar(256) not null, \`description\` text null, \`schema\` text null, \`featured_image\` varchar(1024) null, \`create_date\` date not null, \`update_date\` date not null, \`deleted_at\` date null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`tag\` add unique \`tag_name_unique\`(\`name\`);`);
    this.addSql(`alter table \`tag\` add unique \`tag_slug_unique\`(\`slug\`);`);

    this.addSql(`create table \`user\` (\`id\` int unsigned not null auto_increment primary key, \`firstname\` varchar(96) not null, \`lastname\` varchar(96) null, \`email\` varchar(96) not null, \`password\` varchar(96) not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`user\` add unique \`user_email_unique\`(\`email\`);`);

    this.addSql(`create table \`post\` (\`id\` int unsigned not null auto_increment primary key, \`title\` varchar(512) not null, \`post_type\` enum('post', 'page', 'story', 'series') not null default 'post', \`slug\` varchar(256) not null, \`status\` enum('draft', 'scheduled', 'review', 'published') not null default 'draft', \`content\` text null, \`schema\` text null, \`featured_image_url\` varchar(1024) null, \`published_on\` datetime null, \`author_id\` int unsigned not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`post\` add unique \`post_slug_unique\`(\`slug\`);`);
    this.addSql(`alter table \`post\` add index \`post_author_id_index\`(\`author_id\`);`);

    this.addSql(`create table \`post_tags\` (\`post_id\` int unsigned not null, \`tag_id\` int unsigned not null, primary key (\`post_id\`, \`tag_id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`post_tags\` add index \`post_tags_post_id_index\`(\`post_id\`);`);
    this.addSql(`alter table \`post_tags\` add index \`post_tags_tag_id_index\`(\`tag_id\`);`);

    this.addSql(`create table \`meta_option\` (\`id\` int unsigned not null auto_increment primary key, \`meta_value\` json not null, \`create_date\` datetime not null, \`update_date\` datetime null, \`post_id\` int unsigned not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`meta_option\` add unique \`meta_option_post_id_unique\`(\`post_id\`);`);

    this.addSql(`alter table \`post\` add constraint \`post_author_id_foreign\` foreign key (\`author_id\`) references \`user\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`post_tags\` add constraint \`post_tags_post_id_foreign\` foreign key (\`post_id\`) references \`post\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`post_tags\` add constraint \`post_tags_tag_id_foreign\` foreign key (\`tag_id\`) references \`tag\` (\`id\`) on update cascade on delete cascade;`);

    this.addSql(`alter table \`meta_option\` add constraint \`meta_option_post_id_foreign\` foreign key (\`post_id\`) references \`post\` (\`id\`) on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`post_tags\` drop foreign key \`post_tags_tag_id_foreign\`;`);

    this.addSql(`alter table \`post\` drop foreign key \`post_author_id_foreign\`;`);

    this.addSql(`alter table \`post_tags\` drop foreign key \`post_tags_post_id_foreign\`;`);

    this.addSql(`alter table \`meta_option\` drop foreign key \`meta_option_post_id_foreign\`;`);

    this.addSql(`drop table if exists \`tag\`;`);

    this.addSql(`drop table if exists \`user\`;`);

    this.addSql(`drop table if exists \`post\`;`);

    this.addSql(`drop table if exists \`post_tags\`;`);

    this.addSql(`drop table if exists \`meta_option\`;`);
  }

}
