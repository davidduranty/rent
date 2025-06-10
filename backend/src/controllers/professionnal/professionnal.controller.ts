import { Body, Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { ProfessionnalService } from '@services/professionnal/professionnal.service';
import { ProDto } from 'src/models/professionnal.model';

@Controller('professionnal')
export class ProfessionnalController {

    constructor(private readonly _professionnalService: ProfessionnalService) { }

    @Get('all')
    async getAllProfessionnals() {
        return this._professionnalService.getAllPro();
    }

    @Post('add-professionnal')
    async addProfessionnal(@Body() pro: ProDto) {
        return this._professionnalService.addProfessionnal(pro);
    }




    @Delete(':id')
    async deleteProfessionnal(@Param('id') id: number): Promise<void> {
        const pro = await this._professionnalService.removeId(id);
        if (!pro) {
            throw new Error(`Professionnal with id ${id} not found`);
        }
    }

}
