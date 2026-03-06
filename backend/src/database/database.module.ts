import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from 'src/modules/categories/entities/category.entity';
import { Post } from 'src/modules/posts/entities/post.entity';
import { PostCategory } from 'src/modules/posts/entities/postcategory.entity';
import { PostTag } from 'src/modules/posts/entities/posttag.entity';
import { Tag } from 'src/modules/tags/entities/tag.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Comment } from 'src/modules/comments/entities/comment.entity';
import { Partnership } from 'src/modules/partnerships/entities/partnerships.entity';

@Module({
    imports: [SequelizeModule.forRoot({
        dialect: 'postgres',
        host: process.env.DB_HOST || 'postgres',
        port: Number(process.env.DB_PORT) || 5432,
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASS || 'postgres',
        database: process.env.DB_NAME || 'blogdb',
        models: [User, Tag, Post, Comment, Category, PostCategory, PostTag, Partnership],
        autoLoadModels: true,
        synchronize: true,
    })],
})
export class DatabaseModule { }
