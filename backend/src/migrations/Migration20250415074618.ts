import { Migration } from '@mikro-orm/migrations';

export class Migration20250415074618 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "rentACar"."utilities" ("id" serial primary key, "model" varchar(255) not null, "brand" varchar(255) not null, "licence" varchar(255) not null, "weight" int not null, "volume" int not null, "image" varchar(255) not null, "energy" boolean not null);`);

    this.addSql(`alter table "rentACar"."vehicle" add column "image" varchar(255) not null, add column "available" boolean not null, add column "type" varchar(255) not null;`);
    this.addSql(`alter table "rentACar"."vehicle" rename column "name" to "brand";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "rentACar"."vehicle" drop column "image", drop column "available", drop column "type";`);

    this.addSql(`alter table "rentACar"."vehicle" rename column "brand" to "name";`);
  }

}
