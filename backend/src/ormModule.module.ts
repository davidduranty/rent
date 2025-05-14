import { MikroOrmModule } from "@mikro-orm/nestjs";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { Hour } from "./entities/hour.entity";
import { Location } from "./entities/location.entity";
import { PublicHoliday } from "./entities/public-holiday.entity";
import { LocationService } from "@services/location/location.service";
import { LocationController } from "./controllers/location/location.controller";
import { Vehicle } from "@entities/vehicle.entity";
import { Utilities } from "@entities/utilities.entity";
import { User } from "@entities/user.entity";
import { UserService } from "@services/user/user.service";
import { UserController } from "./controllers/user/user.controller";
import { VehicleController } from "./controllers/vehicle/vehicle.controller";
import { VehicleService } from "@services/vehicle/vehicle.service";
import { LocationHolidayService } from "@services/location-holiday/location-holiday.service";
import { LocationHolidayController } from "./controllers/location-holiday/location-holiday.controller";


@Module({
    imports: [MikroOrmModule.forFeature([Hour, Location, PublicHoliday, Vehicle, Utilities, User])],
    providers: [LocationService, UserService, VehicleService, LocationHolidayService],
    controllers: [LocationController, UserController, VehicleController, LocationHolidayController],
})

class OrmModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply() // Applique le middleware
            .forRoutes(LocationController, UserController, VehicleController, LocationHolidayController); // Spécifie les routes cibles
    }
}
export { OrmModule }