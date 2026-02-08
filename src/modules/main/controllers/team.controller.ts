import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/decorators/auth-guard.decorator';

@Controller('team')
export class TeamController {
    @Public()
    @Get('/combolist')
    async test() {

        const data = [
            {   
                name: 'Wakaba Taiko',
                id: 1,
                icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBybMXiCXPFGKiQl-BKFnhi6DzzGE9dpwdqw&s'
            }
        ]

        return data
    }
}
