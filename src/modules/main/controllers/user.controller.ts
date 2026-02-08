import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/decorators/auth-guard.decorator';
import { User } from 'src/decorators/user.decorator';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }
}
