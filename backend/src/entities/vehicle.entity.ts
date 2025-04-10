import { Collection, Entity, ManyToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Location } from "./location.entity";


@Entity({ schema: 'rentACar', tableName: 'vehicle' })

export class Vehicle {

    @PrimaryKey({ autoincrement: true })
    id!: number;

    @Property({ type: 'string', nullable: false })
    name: string;

    @Property({ type: 'string', nullable: false })
    model: string;

    @Property({ type: 'enum', nullable: false })
    transmition: 'Automatique' | 'Manuelle';

    @Property({ type: 'number', nullable: false })
    place: number;

    @ManyToMany({ entity: () => Location, serializer: value => value, serializedName: 'location' })
    location?: Collection<Location> = new Collection<Location>(this);
}





