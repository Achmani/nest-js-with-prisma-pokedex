import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { MonsterController } from './monster.controller';
import { MonsterGateway } from './gateways/monster.gateway';
import { MonsterRepository } from './repository/monster.repository';
import { MonsterTypeRepository } from './repository/monster-type.repository';
import { MonsterTypeExistRule } from '../validators/monster-type-exist.validator';
import { MonsterAlreadyExistRule } from '../validators/monster-already-exist.validator';
import { MonsterExistRule } from '../validators/monster-exist.validator';

@Module({
    imports: [],
    providers: [PrismaService, MonsterTypeRepository, MonsterRepository, MonsterExistRule,MonsterAlreadyExistRule, MonsterTypeExistRule, MonsterGateway],
    controllers: [MonsterController],
})
export class MonsterModule { }
