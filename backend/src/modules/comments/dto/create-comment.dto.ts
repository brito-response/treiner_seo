import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateCommentDto {
    @ApiProperty({ example: 'Excelente post! Me ajudou bastante.', description: 'Conteúdo do comentário' })
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440123', description: 'ID do post ao qual o comentário pertence' })
    @IsUUID('4')
    postId: string;

    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440999', description: 'ID do usuário que criou o comentário' })
    @IsUUID('4')
    userId: string;
}
