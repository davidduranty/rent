import { PublicHoliday } from "@entities/public-holiday.entity";

export interface LocationDTO {
    id?: number;
    name: string;
    address: string;
    city: string;
    zipCode: string;
    publicHoliday: PublicHoliday;
}
