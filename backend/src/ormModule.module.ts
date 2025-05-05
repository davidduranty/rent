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

@Module({
    imports: [MikroOrmModule.forFeature([Hour, Location, PublicHoliday, Vehicle, Utilities, User])],
    providers: [LocationService, UserService],
    controllers: [LocationController, UserController]
})

class OrmModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply() // Applique le middleware
            .forRoutes(LocationController, UserController);
    }
}
export { OrmModule }