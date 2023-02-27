import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User, Prisma } from "@prisma/client";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class UserRepository {

    constructor(
        private prisma: PrismaService
    ) { }

    async findOne(userName: string) {
        return await this.prisma.user.findFirst({ include: { userType: true }, where: { userName: userName } });
    }

    async monsterCaptured(userName: string, monsters: Prisma.MonsterWhereUniqueInput[]) {
        return await this.prisma.user.update({
            where: { userName: userName },
            data: { monster: { connect: monsters } }
        });
    }

    async monsterUnaptured(userName: string, monsters: Prisma.MonsterWhereUniqueInput[]) {
        return await this.prisma.user.update({
            where: { userName: userName },
            data: { monster: { disconnect: monsters } }
        });
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        return await this.prisma.user.create({
            data,
        });
    }

}