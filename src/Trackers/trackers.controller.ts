import {Controller, Post, Param, Body, Get} from '@nestjs/common';
import {TrackersService} from './trackers.service';

@Controller('api/trackers')
export class TrackersController{
    constructor(private trackersService: TrackersService){}

    @Get(':type/:id')
    public async getTrackers(@Param() params){
        return await this.trackersService.getTrackers(params.id, params.type);
    }

    @Post(':type/:id')
    public async addTrackers(@Param() params, @Body() body){
        return await this.trackersService.addTrackers(params.id, params.type, body);
    }
}