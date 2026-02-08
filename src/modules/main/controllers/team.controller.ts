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
            },
            {
                name: 'Sekiryu Daiko',
                id: 2,
                icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAiqezktRqC4iVyi3UJbDF3HLzrI-F4EC6ug&s'
            },
            {
                name: 'Kokorozashi',
                id: 3,
                icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHuT_qHPBnH0418FMmgv5ZHqk4HeU_tSvJkg&s'
            }
        ]

        return data
    }
}
