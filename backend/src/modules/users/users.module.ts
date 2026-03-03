import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenService } from './token.service';
import { EmailService } from './email.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UsersController, AuthController],
  providers: [UsersService, UserRepository, AuthService,TokenService, EmailService],
  exports: [UsersService]
})
export class UsersModule { }
