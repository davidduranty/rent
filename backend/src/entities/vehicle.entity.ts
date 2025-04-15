import { Collection, Entity, ManyToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Location } from "./location.entity";


@Entity({ schema: 'rentACar', tableName: 'vehicle' })

export class Vehicle {

    @PrimaryKey({ autoincrement: true })
    id!: number;

    @Property({ type: 'string', nullable: false })
    brand: string;

    @Property({ type: 'string', nullable: false })
    model: string;

    @Property({ type: 'string', nullable: false })
    image: string;

    @Property({ type: 'string', nullable: false })
    transmition: string;

    @Property({ type: 'number', nullable: false })
    place: number;

    @Property({ type: 'boolean', nullable: false })
    available: boolean;

    @Property({ type: 'string', nullable: false })
    type: string;

    @ManyToMany({ entity: () => Location, serializer: value => value, serializedName: 'location' })
    location?: Collection<Location> = new Collection<Location>(this);
}





