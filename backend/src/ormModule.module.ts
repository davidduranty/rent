import { MikroOrmModule } from "@mikro-orm/nestjs";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { Hour } from "./entities/hour.entity";
import { Location } from "./entities/location.entity";
import { PublicHoliday } from "./entities/public-holiday.entity";

@Module({
    imports: [MikroOrmModule.forFeature([Hour, Location, PublicHoliday])],
    providers: [],
    controllers: []
})

class OrmModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply() // Applique le middleware
            .forRoutes();
    }
}
export { OrmModule }