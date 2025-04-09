import { DateType, Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Location } from './location.entity'

@Entity({ schema: 'rentACar', tableName: 'hour' })

export class Hour {
    @PrimaryKey({ autoincrement: true })
    id!: number

    @Property({ type: DateType, nullable: true })
    date?: Date | null

    @Property({ type: 'string', nullable: true })
    description?: string

    @ManyToOne(() => Location, { nullable: true })
    location?: Location;
}