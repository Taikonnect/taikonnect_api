import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/decorators/auth-guard.decorator';

@Controller('api')
export class UserController {
    @Public()
    @Get('/test')
    async test() {
        return 'API works!'
    }
}
