import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { CommentsModule } from './modules/comments/comments.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { TagsModule } from './modules/tags/tags.module';
import { ConfigModule } from '@nestjs/config';
import { PartnershipsModule } from './modules/partnerships/partnerships.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }), DatabaseModule, UsersModule, PostsModule, CommentsModule, CategoriesModule, TagsModule, PartnershipsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
