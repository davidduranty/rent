import { Entity, ManyToMany, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Location } from '../entities/location.entity'

@Entity({ schema: 'rentACar', tableName: 'utilities' })

export class Utilities {
    @PrimaryKey({ autoincrement: true })
    id!: number;

    @Property({ type: 'string', nullable: false })
    brand: string;

    @Property({ type: 'string', nullable: false })
    model: string;

    @Property({ type: 'number', nullable: false })
    weight: number;

    @Property({ type: 'number', nullable: false })
    volume: number;

    @Property({ type: 'string', nullable: false })
    image: string;

    @Property({ type: 'boolean', nullable: false })
    isElectric: boolean;

    @ManyToOne(() => Location, { nullable: true })
    location?: Location;
}