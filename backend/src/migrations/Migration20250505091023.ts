import { Migration } from '@mikro-orm/migrations';

export class Migration20250505091023 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "rentACar"."user" rename column "profesionnal" to "professionnal";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "rentACar"."user" rename column "professionnal" to "profesionnal";`);
  }

}
