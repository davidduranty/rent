import { Controller, Get, Query } from '@nestjs/common';
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

    @Get('name')
    public async getName(@Query('name') name: string): Promise<LocationDTO> {
        try {
            console.log(name)
            return await this._LocationService.getByName(name)
        } catch (error) {
            throw new Error('Location not found')
        }
    }

}

