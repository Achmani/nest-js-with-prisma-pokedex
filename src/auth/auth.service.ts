import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../users/repository/user.repository';


@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userRepository.findOne(username);
        if (user && await bcrypt.compare(password, user.userPassword)) {
            const { userPassword, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: User) {
        const payload = { username: user.userName, userid: user.userId, usertype: user.userTypeUserTypeId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}