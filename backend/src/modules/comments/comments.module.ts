import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './entities/comment.entity';
import { CommentsRepository } from './repository/comment.repository';

@Module({
  imports: [SequelizeModule.forFeature([Comment])],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository],
  exports: [CommentsService],
})
export class CommentsModule { }
