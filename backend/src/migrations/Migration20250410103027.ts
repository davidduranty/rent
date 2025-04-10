import { Migration } from '@mikro-orm/migrations';

export class Migration20250410103027 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "rentACar"."vehicle" ("id" serial primary key, "name" varchar(255) not null, "model" varchar(255) not null, "transmition" smallint not null, "place" int not null);`);

    this.addSql(`create table "rentACar"."vehicle_location" ("vehicle_id" int not null, "location_id" int not null, constraint "vehicle_location_pkey" primary key ("vehicle_id", "location_id"));`);

    this.addSql(`alter table "rentACar"."vehicle_location" add constraint "vehicle_location_vehicle_id_foreign" foreign key ("vehicle_id") references "rentACar"."vehicle" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "rentACar"."vehicle_location" add constraint "vehicle_location_location_id_foreign" foreign key ("location_id") references "rentACar"."location" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "rentACar"."hour" add column "end_date" date null;`);
    this.addSql(`alter table "rentACar"."hour" rename column "date" to "start_date";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "rentACar"."vehicle_location" drop constraint "vehicle_location_vehicle_id_foreign";`);

    this.addSql(`alter table "rentACar"."hour" drop column "end_date";`);

    this.addSql(`alter table "rentACar"."hour" rename column "start_date" to "date";`);
  }

}
