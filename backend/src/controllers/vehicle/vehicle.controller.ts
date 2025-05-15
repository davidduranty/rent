import { Controller, Delete, Get, Param } from '@nestjs/common';
import { VehicleService } from '@services/vehicle/vehicle.service';
import { VehicleDTO } from 'src/models/vehicle.model';

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

    @Delete(':id')
    public async deleteVehicle(@Param('id') id: number): Promise<void> {
        const vehicle = await this._vehicleService.removeId(id)
        if (!vehicle) {
            throw new Error(`Vehicle with id ${id} not found`);
        }
    }
}
