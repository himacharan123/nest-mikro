import { Migration } from '@mikro-orm/migrations';

export class Migration20241003081538 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`tag\` modify \`create_date\` datetime not null, modify \`update_date\` datetime not null, modify \`deleted_at\` datetime;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`tag\` modify \`create_date\` date not null, modify \`update_date\` date not null, modify \`deleted_at\` date;`);
  }

}
