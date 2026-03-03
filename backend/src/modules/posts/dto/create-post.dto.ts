import {  IsNotEmpty, IsString, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
    
    @ApiProperty({ example: 'Introdução ao NestJS', description: 'Título do post' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'Neste post vamos aprender os conceitos básicos do NestJS...', description: 'Conteúdo do post' })
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440999', description: 'ID do usuário criador do post' })
    @IsUUID('4')
    userId: string;

};
