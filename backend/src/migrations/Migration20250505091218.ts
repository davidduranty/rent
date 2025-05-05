import { Migration } from '@mikro-orm/migrations';

export class Migration20250505091218 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "rentACar"."user" add constraint "user_name_unique" unique ("name");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "rentACar"."user" drop constraint "user_name_unique";`);
  }

}
