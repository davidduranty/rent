import { Hour } from "@entities/hour.entity";
import { PublicHoliday } from "@entities/public-holiday.entity";
import { Vehicle } from "@entities/vehicle.entity";

export interface LocationDTO {
    id?: number;
    name: string;
    address: string;
    city: string;
    zipCode: number;
    hour: Hour;
    publicHoliday?: PublicHoliday;
    vehicles?: Vehicle;
}
