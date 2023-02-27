import { Monster, MonsterType, Prisma } from "@prisma/client";

import { randomUUID } from "crypto";
import { MonsterResponse } from "../dtos/monster.response";
import { MonsterRepository } from "../repository/monster.repository";
import { MonsterCreateRequest } from "../dtos/monster.create.request";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { MonsterUpdateRequest } from "../dtos/monster.update.request";
import { MonsterDeleteRequest } from "../dtos/monster.delete.request";

@Injectable()
export class MonsterGateway {

    constructor(
        private monsterRepository: MonsterRepository
    ) { }

    async find(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.MonsterWhereUniqueInput;
        where?: Prisma.MonsterWhereUniqueInput;
        orderBy?: Prisma.MonsterOrderByWithRelationInput;
    }): Promise<MonsterResponse[]> {
        type MonstersWithType = Prisma.PromiseReturnType<typeof this.monsterRepository.monsters>
        let result: MonstersWithType = await this.monsterRepository.monsters(params);
        return this.constructResponse(result);
    }

    getOrder(orderFields: string, orderBy: Prisma.SortOrder): Prisma.MonsterOrderByWithRelationInput {
        return {
            monsterId: orderFields == "monsterId" ? orderBy : undefined,
            monsterName: orderFields == "monsterName" ? orderBy : undefined
        }
    }

    async create(monster: MonsterCreateRequest) {
        try {
            return this.monsterRepository.create({ monsterId: randomUUID(), monsterName: monster.monster_name, monsterType: { connect: this.constructMonsterTypes(monster.monster_type) } });
        } catch (error) {
            console.log(error);
            throw new HttpException('Error When Create Monster', HttpStatus.FORBIDDEN);
        }
    }

    async delete(monster: MonsterDeleteRequest) {
        try {
            return this.monsterRepository.delete(monster.monster_name);
        } catch (error) {
            console.log(error);
            throw new HttpException('Error When Delete Monster', HttpStatus.FORBIDDEN);
        }
    }

    async update(monster: MonsterUpdateRequest) {
        try {
            return this.monsterRepository.update(monster.monster_name, { monsterName: monster.monster_name, monsterType: { set: [], connect: this.constructMonsterTypes(monster.monster_type) } });
        } catch (error) {
            console.log(error);
            throw new HttpException('Error When Update Monster', HttpStatus.FORBIDDEN);
        }
    }

    private constructMonsterTypes(monsterTypeNames: string[]): Prisma.MonsterTypeWhereUniqueInput[] {
        let monsterTypes: Prisma.MonsterTypeWhereUniqueInput[] = [];
        monsterTypeNames.forEach(monsterTypeName => {
            monsterTypes.push(this.constructMonsterType(monsterTypeName));
        })
        return monsterTypes;
    }

    private constructMonsterType(monsterTypeName): Prisma.MonsterTypeWhereUniqueInput {
        return { monsterTypeName: monsterTypeName };
    }

    private constructResponse(monsters: (Monster & { monsterType: MonsterType[] })[]): MonsterResponse[] {
        let results: MonsterResponse[] = [];
        monsters.forEach(monster => {
            results.push(this.constructMonster(monster));
        })
        return results;
    }

    private constructMonster(monster: Monster & { monsterType: MonsterType[] }): MonsterResponse {
        return { monsterId: monster.monsterId, monsterName: monster.monsterName, monsterType: monster.monsterType.flatMap((element) => element.monsterTypeName) }
    }

}