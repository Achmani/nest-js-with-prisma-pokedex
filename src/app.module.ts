import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { AppController } from './app.controller';
import { UserModule } from './users/user.module';
import { MonsterModule } from './monsters/monster.module';
import { UserGateway } from './users/gateways/user.gateway';
import { UserRepository } from './users/repository/user.repository';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [MonsterModule, AuthModule, UserModule],
  controllers: [AppController],
  // providers: [, {
  //   provide: APP_GUARD,
  //   useClass: JwtAuthGuard,
  // }, PrismaService, AppService],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    UserRepository, UserGateway, PrismaService, AppService],
})
export class AppModule { }
