import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Request
} from '@nestjs/common';
import { UserGateway } from './gateways/user.gateway';
import { MonsterCapturedRequest } from './dtos/monster.captured.request';
@Controller('user')
export class UserController {
    constructor(
        private readonly userGateway: UserGateway,
    ) { }


    @Post('/monster/captured')
    async monsterCaptured(@Request() req, @Body() request: MonsterCapturedRequest) {
        console.log(req);
        console.log(req.user);
        return await this.userGateway.monsterCaptured(req.user.username, request);
    }

    @Post('/monster/captured')
    async monsterUncaptured(@Request() req, @Body() request: MonsterCapturedRequest) {
        return await this.userGateway.monsterUncaptured(req.user.userName, request);
    }


}