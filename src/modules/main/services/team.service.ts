import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';



@Injectable()
export class TeamService {

    constructor(
        private readonly prismaService: PrismaService,
    ) { }

    async combolist() {

        const teams = await this.prismaService.group.findMany({
            where: {
                is_active: true
            }
        });

        teams.map((t: any) => {
            t.icon = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBybMXiCXPFGKiQl-BKFnhi6DzzGE9dpwdqw&s'
        })

        return teams;
    }
}
