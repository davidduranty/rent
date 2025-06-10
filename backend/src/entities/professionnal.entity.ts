import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ schema: 'rentACar', tableName: 'professionnal' })

export class Professionnal {
    @PrimaryKey({ autoincrement: true })
    id!: number;

    @Property({ type: 'string', nullable: false })
    name: string;

    @Property({ type: 'string', nullable: false })
    siret: string;

    @Property({ type: 'string', nullable: false })
    email: string;

    @Property({ type: 'string', nullable: false })
    password: string;

    @Property({ type: 'string', nullable: true })
    image: string;
}