import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.entity.ts/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { currentUserInterceptor } from './interceptors/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    currentUserInterceptor,
    {
      provide: APP_INTERCEPTOR,
      useClass: currentUserInterceptor,
    },
  ],
})
export class UsersModule {
  configure(consumer: import('@nestjs/common').MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
