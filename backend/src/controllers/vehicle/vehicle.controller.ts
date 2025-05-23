import { Vehicle } from '@entities/vehicle.entity';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { VehicleService } from '@services/vehicle/vehicle.service';
import { VehicleDTO } from 'src/models/vehicle.model';
import { VehicleAvailabilityModel } from '../../models/vehicle-availability.model';

@Controller('vehicle')
export class VehicleController {
    constructor(private readonly _vehicleService: VehicleService) { }

    @Get('all')
    public async getAllLocation(): Promise<VehicleDTO[]> {
        try {
            return await this._vehicleService.getAll();
        } catch (error) {
            throw new Error('User not found')
        }
    }

    @Get()
    public async getVehicles(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ) {
        return this._vehicleService.getVehicles(page, limit);
    }

    @Post('add-vehicle')
    public async post(@Body() data: VehicleDTO) {
        console.log(data)
        return await this._vehicleService.addVehicle(data)
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() data: Vehicle) {
        return this._vehicleService.update(id, data);
    }

    @Post('available')
    public async getAvailableVehicles(
        @Body() availability: VehicleAvailabilityModel
    ): Promise<VehicleDTO[]> {
        try {
            return await this._vehicleService.findAvailable(
                availability.startDate,
                availability.endDate,
                availability.location,
                availability.isProfessional
            );
        } catch (error) {
            throw new Error(error.message);
        }
    }

    @Delete(':id')
    public async deleteVehicle(@Param('id') id: number): Promise<void> {
        const vehicle = await this._vehicleService.removeId(id)
        if (!vehicle) {
            throw new Error(`Vehicle with id ${id} not found`);
        }
    }
}
