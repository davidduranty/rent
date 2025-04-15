import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ schema: 'rentACar', tableName: 'utilities' })

export class Utilities {
    @PrimaryKey({ autoincrement: true })
    id!: number;

    @Property({ type: 'string', nullable: false })
    model: string;

    @Property({ type: 'string', nullable: false })
    brand: string;

    @Property({ type: 'string', nullable: false })
    licence: string;

    @Property({ type: 'number', nullable: false })
    weight: number;

    @Property({ type: 'number', nullable: false })
    volume: number;

    @Property({ type: 'string', nullable: false })
    image: string;

    @Property({ type: 'boolean', nullable: false })
    energy: boolean;

}