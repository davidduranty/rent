import { Entity, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Location } from './location.entity';

@Entity({ schema: 'rentACar', tableName: 'public_holiday' })

export class PublicHoliday {
    @PrimaryKey({ autoincrement: true })
    id!: number;

    @Property({ type: 'string', nullable: false })
    monday: string;

    @Property({ type: 'string', nullable: false })
    tuesday: string;

    @Property({ type: 'string', nullable: false })
    wednesday: string;

    @Property({ type: 'string', nullable: false })
    thursday: string;

    @Property({ type: 'string', nullable: false })
    friday: string;

    @Property({ type: 'string', nullable: false })
    saturday: string;

    @Property({ type: 'string', nullable: false })
    sunday: string;

    @OneToOne(() => Location, (location) => location.publicHoliday)
    location?: Location;

}