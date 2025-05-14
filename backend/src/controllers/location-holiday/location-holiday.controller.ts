import { Controller, Get, Param, Query } from '@nestjs/common';
import { LocationHolidayService } from '@services/location-holiday/location-holiday.service';
import { PublicHolidayDTO } from 'src/models/public-holiday.model';

@Controller('location-holiday')
export class LocationHolidayController {
    constructor(private readonly _publicHolidaySerevice: LocationHolidayService) { }

    @Get('all')
    public async getAllLocationHoliday(): Promise<PublicHolidayDTO[]> {
        try {
            return await this._publicHolidaySerevice.getAll();
        } catch (error) {
            throw new Error('Location not found')
        }
    }

    @Get(':id')
    public async getId(@Param('id') id: number): Promise<PublicHolidayDTO> {
        try {
            console.log(id)
            return await this._publicHolidaySerevice.getById(id)
        } catch (error) {
            throw new Error('public-holiday not found')
        }
    }
}
