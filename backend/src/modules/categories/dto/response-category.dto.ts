import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ResponseCategoryDto {
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440abc', description: 'ID da categoria' })
    @Expose()
    categoryId: string;

    @ApiProperty({ example: 'Tecnologia', description: 'Nome da categoria' })
    @Expose()
    name: string;

    @ApiProperty({ example: 'tecnologia', description: 'Slug da categoria' })
    @Expose()
    slug: string;

    @ApiProperty({ example: 'tecnologia ....', description: 'descrição da categoria' })
    @Expose()
    description: string;

    @ApiPropertyOptional({ example: 'mdi:cpu-64-bit', description: 'Ícone da categoria' })
    @Expose()
    icon?: string;

    @ApiPropertyOptional({ example: true, description: 'Indica se a categoria está ativa' })
    @Expose()
    isActive?: boolean;

    @ApiProperty({ example: '2024-01-20T12:00:00.000Z', description: 'Data de criação da categoria' })
    @Expose()
    createdAt?: Date;

    @ApiProperty({ example: '2024-01-22T09:30:00.000Z', description: 'Data da última atualização da categoria' })
    @Expose()
    updatedAt?: Date;
}