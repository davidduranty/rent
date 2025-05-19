import { Location } from '@entities/location.entity';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { LocationService } from '@services/location/location.service';
import { LocationDTO } from 'src/models/location.model';

@Controller('location')
export class LocationController {
    constructor(private readonly _locationService: LocationService) { }

    @Get('all')
    public async getAllLocation(): Promise<LocationDTO[]> {
        try {
            return await this._locationService.getAll();
        } catch (error) {
            throw new Error('Location not found')
        }
    }

    @Get(':id')
    public async getLocationById(@Param('id') id: number): Promise<LocationDTO> {
        try {
            return await this._locationService.getById(id);
        } catch (error) {
            throw new Error('Location not found')
        }
    }

    @Get('name')
    public async getName(@Query('name') name: string): Promise<LocationDTO> {
        try {
            console.log(name)
            return await this._locationService.getByName(name)
        } catch (error) {
            throw new Error('User not found')
        }
    }

    @Post('add-location')
    public async post(@Body() data: LocationDTO) {
        return await this._locationService.addLocation(data)
    }


    @Put(':id')
    update(@Param('id') id: number, @Body() location: Location) {
        return this._locationService.update(id, location);
    }

    @Delete(':id')
    public async deleteLocation(@Param('id') id: number): Promise<void> {
        const location = await this._locationService.removeId(id)
        if (!location) {
            throw new Error(`Location with id ${id} not found`);
        }
    }
}

