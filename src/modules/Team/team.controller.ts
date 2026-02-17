import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/auth-guard.decorator';
import { TeamService } from './team.service';

@ApiTags('Grupos')
@Controller('team')
export class TeamController {

    constructor(
        private readonly teamService: TeamService
    ) { }

    @Public()
    @Get('/combolist')
    async combolist() {
        return await this.teamService.combolist();
    }
}
