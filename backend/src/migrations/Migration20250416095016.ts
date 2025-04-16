import { Migration } from '@mikro-orm/migrations';

export class Migration20250416095016 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "rentACar"."location" alter column "zip_code" type int using ("zip_code"::int);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "rentACar"."location" alter column "zip_code" type varchar(255) using ("zip_code"::varchar(255));`);
  }

}
