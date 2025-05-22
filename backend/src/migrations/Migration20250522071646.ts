import { Migration } from '@mikro-orm/migrations';

export class Migration20250522071646 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "rentACar"."location" drop constraint "location_public_holiday_id_foreign";`);

    this.addSql(`alter table "rentACar"."location" alter column "public_holiday_id" type int using ("public_holiday_id"::int);`);
    this.addSql(`alter table "rentACar"."location" alter column "public_holiday_id" drop not null;`);
    this.addSql(`alter table "rentACar"."location" add constraint "location_public_holiday_id_foreign" foreign key ("public_holiday_id") references "rentACar"."public_holiday" ("id") on update cascade on delete set null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "rentACar"."location" drop constraint "location_public_holiday_id_foreign";`);

    this.addSql(`alter table "rentACar"."location" alter column "public_holiday_id" type int using ("public_holiday_id"::int);`);
    this.addSql(`alter table "rentACar"."location" alter column "public_holiday_id" set not null;`);
    this.addSql(`alter table "rentACar"."location" add constraint "location_public_holiday_id_foreign" foreign key ("public_holiday_id") references "rentACar"."public_holiday" ("id") on update cascade;`);
  }

}
