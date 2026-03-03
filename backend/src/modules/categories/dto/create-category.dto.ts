import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({ example: 'Tecnologia', description: 'Nome da categoria' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'tecnologia', description: 'Slug da categoria (usado em URLs)' })
    @IsString()
    @IsNotEmpty()
    slug: string;

    @ApiProperty({ example: 'descrição ...', description: 'essa categoria referente ao.. e engloba todos...' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiPropertyOptional({ example: 'mdi:cpu-64-bit', description: 'Ícone da categoria' })
    @IsString()
    @IsOptional()
    icon?: string;



    @ApiPropertyOptional({ example: true, description: 'Indica se a categoria está ativa' })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
};
