import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tag } from './entities/tag.entity';
import { TagsRepository } from './repository/tag.repository';

@Module({
  imports: [SequelizeModule.forFeature([Tag])],
  controllers: [TagsController],
  providers: [TagsService, TagsRepository],
  exports: [TagsService],
})
export class TagsModule { }
