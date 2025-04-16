import { MikroOrmModule } from "@mikro-orm/nestjs";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { Hour } from "./entities/hour.entity";
import { Location } from "./entities/location.entity";
import { PublicHoliday } from "./entities/public-holiday.entity";
import { LocationService } from "@services/location/location.service";
import { LocationController } from "./controllers/location/location.controller";
import { Vehicle } from "@entities/vehicle.entity";
import { Utilities } from "@entities/utilities.entity";

@Module({
    imports: [MikroOrmModule.forFeature([Hour, Location, PublicHoliday, Vehicle, Utilities])],
    providers: [LocationService],
    controllers: [LocationController]
})

class OrmModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply() // Applique le middleware
            .forRoutes(LocationController);
    }
}
export { OrmModule }