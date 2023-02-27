import { Monster, MonsterType, Prisma, User, UserType } from "@prisma/client";

import { Injectable } from "@nestjs/common";
import { UserResponse } from "../dtos/user.response";
import { UserRepository } from "../repository/user.repository";
import { MonsterCapturedRequest } from "../dtos/monster.captured.request";
import { MonsterCreateRequest } from "../../monsters/dtos/monster.create.request";

@Injectable()
export class UserGateway {

    constructor(
        private userRepository: UserRepository
    ) { }

    async user(userName: string): Promise<UserResponse> {
        type UserWithType = Prisma.PromiseReturnType<typeof this.userRepository.findOne>
        let result: UserWithType = await this.userRepository.findOne(userName);
        return this.constructResponse(result);
    }

    private constructResponse(user: User & { userType: UserType }): UserResponse {
        return { userId: user.userId, userName: user.userName, userType: user.userType.userTypeName }
    }

    async monsterCaptured(username: string, monster: MonsterCapturedRequest) {
        this.userRepository.monsterCaptured(username, this.constructMonsters(monster.monster_name))

    }

    async monsterUncaptured(username: string, monster: MonsterCapturedRequest) {
        this.userRepository.monsterUnaptured(username, this.constructMonsters(monster.monster_name))

    }


    private constructMonsters(monsterNames: string[]): Prisma.MonsterWhereUniqueInput[] {
        let monsters: Prisma.MonsterWhereUniqueInput[] = [];
        monsterNames.forEach(monsterName => {
            monsters.push(this.constructMonster(monsterName));
        })
        return monsters;
    }

    private constructMonster(monsterName: string) {
        return { "monsterName": monsterName }
    }

}