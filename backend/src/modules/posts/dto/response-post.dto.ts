import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { PostStatus } from '../entities/post.entity';

@Exclude()
export class ResponsePostDto {
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001', description: 'ID do post' })
    @Expose()
    postId: string;

    @ApiProperty({ example: 'Introdução ao NestJS', description: 'Título do post' })
    @Expose()
    title: string;

    @ApiPropertyOptional({ example: 'https://meusite.com/imagem.png', description: 'Imagem do post' })
    @Expose()
    image?: string;

    @ApiProperty({ example: 'Conteúdo completo do post...', description: 'Conteúdo do post' })
    @Expose()
    content: string;

    @ApiProperty({ enum: PostStatus, example: PostStatus.PUBLISHED, description: 'Status do post' })
    @Expose()
    status: PostStatus;

    @ApiPropertyOptional({ example: '2024-01-20T10:00:00.000Z', description: 'Data de publicação do post' })
    @Expose()
    publishedAt?: Date;

    @ApiProperty({ example: '2024-01-19T09:00:00.000Z', description: 'Data de criação do post' })
    @Expose()
    createdAt: Date;

    @ApiProperty({ example: '2024-01-21T15:30:00.000Z', description: 'Data da última atualização do post' })
    @Expose()
    updatedAt: Date;

    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440999', description: 'ID do autor do post' })
    @Expose()
    userId: string;
}
