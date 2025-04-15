import { Migration } from '@mikro-orm/migrations';

export class Migration20250415095132 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "rentACar"."vehicle" alter column "transmition" type varchar(255) using ("transmition"::varchar(255));`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "rentACar"."vehicle" alter column "transmition" type smallint using ("transmition"::smallint);`);
  }

}
