import { Migration } from '@mikro-orm/migrations';

export class Migration20250409153830 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create schema if not exists "rentACar";`);
    this.addSql(`create table "rentACar"."public_holiday" ("id" serial primary key, "monday" varchar(255) not null, "tuesday" varchar(255) not null, "wednesday" varchar(255) not null, "thursday" varchar(255) not null, "friday" varchar(255) not null, "saturday" varchar(255) not null, "sunday" varchar(255) not null);`);

    this.addSql(`create table "rentACar"."location" ("id" serial primary key, "name" varchar(255) not null, "address" varchar(255) not null, "city" varchar(255) not null, "zip_code" varchar(255) not null, "public_holiday_id" int not null);`);
    this.addSql(`alter table "rentACar"."location" add constraint "location_public_holiday_id_unique" unique ("public_holiday_id");`);

    this.addSql(`create table "rentACar"."hour" ("id" serial primary key, "date" date null, "description" varchar(255) null, "location_id" int null);`);

    this.addSql(`alter table "rentACar"."location" add constraint "location_public_holiday_id_foreign" foreign key ("public_holiday_id") references "rentACar"."public_holiday" ("id") on update cascade;`);

    this.addSql(`alter table "rentACar"."hour" add constraint "hour_location_id_foreign" foreign key ("location_id") references "rentACar"."location" ("id") on update cascade on delete set null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "rentACar"."location" drop constraint "location_public_holiday_id_foreign";`);

    this.addSql(`alter table "rentACar"."hour" drop constraint "hour_location_id_foreign";`);
  }

}
