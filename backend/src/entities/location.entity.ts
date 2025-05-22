import { Collection, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Hour } from "./hour.entity";
import { PublicHoliday } from "./public-holiday.entity";
import { Vehicle } from "./vehicle.entity";
import { Utilities } from "./utilities.entity";

@Entity({ schema: 'rentACar', tableName: 'location' })

export class Location {
    @PrimaryKey({ autoincrement: true })
    id!: number;

    @Property({ type: 'string', nullable: false })
    name: string;

    @Property({ type: 'string', nullable: false })
    address: string;

    @Property({ type: 'string', nullable: false })
    city: string;

    @Property({ type: 'number', nullable: false })
    zipCode: number;

    @OneToMany(() => Hour, (event) => event.location, { eager: false })
    hour? = new Collection<Hour>(this)

    @ManyToOne(() => PublicHoliday, { nullable: true })
    publicHoliday?: PublicHoliday;

    @OneToMany(() => Vehicle, (event) => event.location, { eager: false })
    vehicles? = new Collection<Vehicle>(this);

    @OneToMany(() => Utilities, (event) => event.location, { eager: false })
    utilities? = new Collection<Utilities>(this);

}