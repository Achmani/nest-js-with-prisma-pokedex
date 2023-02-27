import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { Controller, Get, Post, UseGuards, Request, Body, HttpException, HttpStatus } from '@nestjs/common';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { UserGateway } from './users/gateways/user.gateway';
import { UserCreateRequest } from './users/dtos/user.create.request';
import { Prisma } from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userGateway: UserGateway,
    private readonly authService: AuthService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Post('user')
  async createUser(@Body() request: UserCreateRequest) {
    try {
      // return await this.userGateway.createUser(request);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientValidationError) {
        throw new HttpException(e.message, HttpStatus.FORBIDDEN); 
      }
    }
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
