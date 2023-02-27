import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { MonsterGateway } from './gateways/monster.gateway';
import { MonsterCreateRequest } from './dtos/monster.create.request';
import { MonsterUpdateRequest } from './dtos/monster.update.request';
import { MonsterDeleteRequest } from './dtos/monster.delete.request';
import { Public } from '../decorators/public.decorator';
@Controller('monster')
export class MonsterController {
    constructor(
        private readonly monsterGateway: MonsterGateway,
    ) { }

    @Public()
    @Get('/:skip/:take/:orderFields/:orderBy')
    async get(@Param('skip') skip: number, @Param('take') take: number, @Param('orderFields') orderFields: string, @Param('orderBy') orderBy: Prisma.SortOrder) {
        let sortOrder = this.monsterGateway.getOrder(orderFields, orderBy);
        return await this.monsterGateway.find({ skip: Number(skip), take: Number(take), orderBy: sortOrder });
    }

    @Post('/')
    async create(@Body() request: MonsterCreateRequest) {
        return await this.monsterGateway.create(request);
    }

    @Put('/')
    async update(@Body() request: MonsterUpdateRequest) {
        return await this.monsterGateway.update(request);
    }

    @Delete('/')
    async delete(@Body() request: MonsterDeleteRequest) {
        return await this.monsterGateway.delete(request);
    }

}