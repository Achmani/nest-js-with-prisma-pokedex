import { Module } from "@nestjs/common";
import { UserController } from "./users.controller";
import { UserGateway } from "./gateways/user.gateway";
import { UserRepository } from "./repository/user.repository";
import { PrismaService } from "../prisma.service";

@Module({
    imports: [],
    providers: [PrismaService, UserRepository, UserGateway],
    controllers: [UserController],
})
export class UserModule { }