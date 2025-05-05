import { Migration } from '@mikro-orm/migrations';

export class Migration20250505083803 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "rentACar"."user" alter column "birthday" type varchar(255) using ("birthday"::varchar(255));`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "rentACar"."user" alter column "birthday" type date using ("birthday"::date);`);
  }

}
