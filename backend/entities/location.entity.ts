import { Collection, Entity, OneToMany, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Hour } from "./hour.entity";
import { PublicHoliday } from "./public-holiday.entity";

@Entity()

export class Location {
    @PrimaryKey({ autoincrement: true })
    id!: number;

    @Property({ type: 'string', nullable: false })
    name: string;

    @Property({ type: 'string', nullable: false })
    address: string;

    @Property({ type: 'string', nullable: false })
    city: string

    @Property({ type: 'string', nullable: false })
    zipCode: string

    @OneToMany(() => Hour, (event) => event.location, { eager: false })
    hour = new Collection<Hour>(this)

    @OneToOne(() => PublicHoliday, (event) => event.location, { owner: true })
    publicHoliday: PublicHoliday;

}