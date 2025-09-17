import { Migration } from '@mikro-orm/migrations';

export class Migration20250505081804 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "rentACar"."user" ("id" serial primary key, "name" varchar(255) not null, "surname" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "birthday" date not null, "is_admin" boolean not null, "profesionnal" boolean not null);`);
  }

}
