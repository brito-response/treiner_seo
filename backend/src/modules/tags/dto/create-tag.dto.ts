import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTagDto {
    @ApiProperty({ example: 'Política', description: 'Nome da tag' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'politica', description: 'Slug único da tag' })
    @IsString()
    @IsNotEmpty()
    slug: string;

    @ApiPropertyOptional({ example: 'Tag relacionada a notícias políticas', description: 'Descrição opcional da tag' })
    @IsString()
    @IsOptional()
    description?: string;
}