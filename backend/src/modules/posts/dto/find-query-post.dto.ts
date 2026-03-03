import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, IsUUID } from "class-validator";
import { PostStatus } from "../entities/post.entity";
import { Type } from "class-transformer";

export class FindPostsQueryDto {

    @ApiPropertyOptional({ enum: PostStatus })
    @IsOptional()
    @IsEnum(PostStatus)
    status?: PostStatus;

    @ApiPropertyOptional({ description: 'Busca pelo usuario que criou' })
    @IsOptional()
    @IsUUID()
    userId?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    categoryId?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    tagId?: string;

    @ApiPropertyOptional({ description: 'Busca por título ou conteúdo' })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({ enum: ['createdAt', 'publishedAt'] })
    @IsOptional()
    @IsEnum(['createdAt', 'publishedAt'])
    orderBy?: 'createdAt' | 'publishedAt';

    @ApiPropertyOptional({ enum: ['ASC', 'DESC'] })
    @IsOptional()
    @IsEnum(['ASC', 'DESC'])
    order?: 'ASC' | 'DESC';

    @ApiPropertyOptional({ default: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    page: number = 1;

    @ApiPropertyOptional({ default: 10 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    limit: number = 10;
}