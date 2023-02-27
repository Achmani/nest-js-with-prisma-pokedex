import { Injectable } from "@nestjs/common";
import { Monster, Prisma } from "@prisma/client";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class MonsterTypeRepository {

    constructor(
        private prisma: PrismaService
    ) { }

    async findOneOrFail(monsterTypeName: string) {
        return this.prisma.monsterType.findFirstOrThrow({where:{monsterTypeName:monsterTypeName}});
    }

    async monsterType(monsterTypeNameList: string[]) {
        return this.prisma.monsterType.findMany({
            where: {
                monsterTypeName: { in: monsterTypeNameList },
            }
        })
    }

    async createMonster(data: Prisma.MonsterCreateInput): Promise<Monster> {
        return this.prisma.monster.create({
            data,
        });
    }

}