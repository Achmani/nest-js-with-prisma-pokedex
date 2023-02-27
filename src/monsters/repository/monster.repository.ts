import { Injectable } from "@nestjs/common";
import { Monster, Prisma } from "@prisma/client";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class MonsterRepository {

    constructor(
        private prisma: PrismaService
    ) { }

    async findOne(monsterName: string) {
        return this.prisma.monster.findFirst({ where: { monsterName: monsterName } });
    }
    async findOneOrFail(monsterName: string) {
        return this.prisma.monster.findFirstOrThrow({ where: { monsterName: monsterName } });
    }

    async monsters(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.MonsterWhereUniqueInput;
        where?: Prisma.MonsterWhereUniqueInput;
        orderBy?: Prisma.MonsterOrderByWithRelationInput;
    }) {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.monster.findMany({
            include: { monsterType: true },
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async update(monsterName: string, data: Prisma.MonsterUpdateInput): Promise<Monster> {
        return await this.prisma.monster.update({ where: { monsterName: monsterName }, data: data });
    }

    async delete(monsterName: string): Promise<Monster> {
        return await this.prisma.monster.delete({ where: { monsterName: monsterName } });
    }

    async create(data: Prisma.MonsterCreateInput): Promise<Monster> {
        try {
            return await this.prisma.monster.create({
                data,
            });
        } catch (error) {
            console.log(error);
        }
    }

}