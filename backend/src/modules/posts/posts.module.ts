import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './entities/post.entity';
import { PostCategory } from './entities/postcategory.entity';
import { PostTag } from './entities/posttag.entity';
import { PostsRepository } from './repository/post.repository';

@Module({
  imports: [SequelizeModule.forFeature([Post, PostCategory, PostTag])],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
  exports: [PostsService],
})
export class PostsModule { }
