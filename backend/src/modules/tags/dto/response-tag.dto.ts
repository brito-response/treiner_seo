import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ResponseTagDto {

    @ApiProperty({ example: 'uuid-da-tag', description: 'ID único da tag' })
    @Expose()
    tagId: string;

    @ApiProperty({ example: 'Política', description: 'Nome da tag' })
    @Expose()
    name: string;

    @ApiProperty({ example: 'politica', description: 'Slug da tag' })
    @Expose()
    slug: string;

    @ApiProperty({ example: 'Tag relacionada a notícias políticas', description: 'Descrição da tag' })
    @Expose()
    description?: string;
}