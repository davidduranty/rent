import { Migration } from '@mikro-orm/migrations';

export class Migration20250520094038 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "rentACar"."location" drop constraint "location_public_holiday_id_unique";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "rentACar"."location" add constraint "location_public_holiday_id_unique" unique ("public_holiday_id");`);
  }

}
