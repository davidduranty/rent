// ormModule.module.ts
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
import { Professionnal } from "@entities/professionnal.entity";// Ajoutez HttpModule à la liste des imports

import { ProfessionnalService } from "@services/professionnal/professionnal.service";
import { ProfessionnalController } from './controllers/professionnal/professionnal.controller';
import { AuthService } from "@services/auth/auth.service";
import { AuthController } from "./controllers/auth/auth.controller";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [
        MikroOrmModule.forFeature([
            Hour,
            Location,
            PublicHoliday,
            Vehicle,
            Utilities,
            User,
            Professionnal,
        ]),
    ],
    providers: [
        LocationService,
        UserService,
        VehicleService,
        LocationHolidayService,
        ProfessionnalService,
        AuthService,
        JwtService
    ],
    controllers: [
        LocationController,
        UserController,
        VehicleController,
        ProfessionnalController,
        LocationHolidayController,
        AuthController
    ],
})
class OrmModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply() // Applique le middleware
            .forRoutes(
                LocationController,
                UserController,
                VehicleController,
                LocationHolidayController
            ); // Spécifie les routes cibles
    }
}
export { OrmModule };