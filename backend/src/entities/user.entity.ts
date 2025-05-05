import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ schema: 'rentACar', tableName: 'user' })

export class User {
    @PrimaryKey({ autoincrement: true })
    id!: number;

    @Property({ type: 'string', nullable: false, unique: true })
    name: string;

    @Property({ type: 'string', nullable: false })
    surname: string;

    @Property({ type: 'string', nullable: false })
    email: string;

    @Property({ type: 'string', nullable: false })
    password: string;

    @Property({ type: 'string', nullable: false })
    birthday: string;

    @Property({ type: 'boolean', nullable: false })
    isAdmin: boolean;

    @Property({ type: 'boolean', nullable: false })
    professionnal: boolean;
}