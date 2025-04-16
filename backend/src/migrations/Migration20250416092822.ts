import { Migration } from '@mikro-orm/migrations';

export class Migration20250416092822 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "rentACar"."public_holiday" ("id" serial primary key, "monday" varchar(255) not null, "tuesday" varchar(255) not null, "wednesday" varchar(255) not null, "thursday" varchar(255) not null, "friday" varchar(255) not null, "saturday" varchar(255) not null, "sunday" varchar(255) not null);`);

    this.addSql(`create table "rentACar"."location" ("id" serial primary key, "name" varchar(255) not null, "address" varchar(255) not null, "city" varchar(255) not null, "zip_code" varchar(255) not null, "public_holiday_id" int not null);`);
    this.addSql(`alter table "rentACar"."location" add constraint "location_public_holiday_id_unique" unique ("public_holiday_id");`);

    this.addSql(`create table "rentACar"."hour" ("id" serial primary key, "start_date" date null, "end_date" date null, "description" varchar(255) null, "location_id" int null);`);

    this.addSql(`create table "rentACar"."utilities" ("id" serial primary key, "brand" varchar(255) not null, "model" varchar(255) not null, "weight" int not null, "volume" int not null, "image" varchar(255) not null, "is_electric" boolean not null, "location_id" int null);`);

    this.addSql(`create table "rentACar"."vehicle" ("id" serial primary key, "brand" varchar(255) not null, "model" varchar(255) not null, "image" varchar(255) not null, "transmition" varchar(255) not null, "place" int not null, "available" boolean not null, "type" varchar(255) not null, "location_id" int null);`);

    this.addSql(`alter table "rentACar"."location" add constraint "location_public_holiday_id_foreign" foreign key ("public_holiday_id") references "rentACar"."public_holiday" ("id") on update cascade;`);

    this.addSql(`alter table "rentACar"."hour" add constraint "hour_location_id_foreign" foreign key ("location_id") references "rentACar"."location" ("id") on update cascade on delete set null;`);

    this.addSql(`alter table "rentACar"."utilities" add constraint "utilities_location_id_foreign" foreign key ("location_id") references "rentACar"."location" ("id") on update cascade on delete set null;`);

    this.addSql(`alter table "rentACar"."vehicle" add constraint "vehicle_location_id_foreign" foreign key ("location_id") references "rentACar"."location" ("id") on update cascade on delete set null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "rentACar"."location" drop constraint "location_public_holiday_id_foreign";`);

    this.addSql(`alter table "rentACar"."hour" drop constraint "hour_location_id_foreign";`);

    this.addSql(`alter table "rentACar"."utilities" drop constraint "utilities_location_id_foreign";`);

    this.addSql(`alter table "rentACar"."vehicle" drop constraint "vehicle_location_id_foreign";`);

    this.addSql(`create table "rentACar"."vehicle_location" ("vehicle_id" int4 not null, "location_id" int4 not null, constraint "vehicle_location_pkey" primary key ("vehicle_id", "location_id"));`);
  }

}
