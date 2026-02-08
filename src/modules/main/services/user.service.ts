import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';



@Injectable()
export class UserService {

    constructor(
        private readonly prismaService: PrismaService,
    ) { }
}
