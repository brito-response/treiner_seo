import { Exclude, Expose, Type } from "class-transformer";
import { ApiProperty } from '@nestjs/swagger';
import { ResponseUserDto } from "src/modules/users/dto";
import { ResponseCategoryDto } from "src/modules/categories/dto";
import { ResponseTagDto } from "src/modules/tags/dto";

@Exclude()
export class ResponsePostQueryDto {
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001' })
    @Expose()
    postId: string;

    @ApiProperty({ example: 'Introdução ao NestJS' })
    @Expose()
    title: string;

    @ApiProperty({ example: 'Conteúdo completo do post...' })
    @Expose()
    content: string;

    @ApiProperty({ example: 'imagem do post...' })
    @Expose()
    image: string;

    @ApiProperty({ example: 'PUBLISHED' })
    @Expose()
    status: string;

    @ApiProperty({ example: '2024-01-19T09:00:00.000Z' })
    @Expose()
    createdAt: Date;

    @ApiProperty({ example: '2024-01-21T15:30:00.000Z' })
    @Expose()
    updatedAt: Date;

    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440999' })
    @Expose()
    userId: string;

    @ApiProperty({ type: () => ResponseUserDto })
    @Expose()
    @Type(() => ResponseUserDto)
    user: ResponseUserDto;

    @ApiProperty({ type: () => ResponseCategoryDto, isArray: true })
    @Expose()
    @Type(() => ResponseCategoryDto)
    categories: ResponseCategoryDto[];

    @ApiProperty({ type: () => ResponseTagDto, isArray: true })
    @Expose()
    @Type(() => ResponseTagDto)
    tags: ResponseTagDto[];
};