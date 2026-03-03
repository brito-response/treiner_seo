import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PostStatus } from '../entities/postcategory.entity';

export class UpdatePostDto extends PartialType(CreatePostDto) {

    @ApiPropertyOptional({ enum: PostStatus, example: PostStatus.PUBLISHED, description: 'Status do post' })
    @IsEnum(PostStatus)
    @IsOptional()
    status?: PostStatus;

    @ApiPropertyOptional({ example: 'https://meusite.com/imagens/nova-imagem.png', description: 'Nova imagem do post' })
    @IsString()
    @IsOptional()
    image?: string;

};
