import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PartnershipsRepository } from './repository/partnerships.repository';
import { Partnership } from './entities/partnerships.entity';
import { PartnershipsController } from './partnerships.controller';
import { PartnershipsService } from './partnerships.service';

@Module({
  imports: [SequelizeModule.forFeature([Partnership])],
  controllers: [PartnershipsController],
  providers: [PartnershipsService, PartnershipsRepository],
  exports: [PartnershipsService],
})
export class PartnershipsModule { }
