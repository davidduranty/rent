import { Controller, Get } from '@nestjs/common';
import { LocationService } from '@services/location/location.service';
import { LocationDTO } from 'src/models/location.model';

@Controller('location')
export class LocationController {
    constructor(private readonly _LocationService: LocationService) { }

    @Get('all')
    public async getAllLocation(): Promise<LocationDTO[]> {
        try {
            return await this._LocationService.getAll();
        } catch (error) {
            throw new Error('Location not found')
        }
    }

}
