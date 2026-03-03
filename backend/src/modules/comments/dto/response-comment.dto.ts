import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ResponseCommentDto {

    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440123', description: 'ID do comentário' })
    @Expose()
    commentId: string;

    @ApiProperty({ example: 'Excelente post! Me ajudou bastante.', description: 'Conteúdo do comentário' })
    @Expose()
    content: string;

    @ApiProperty({ example: false, description: 'Indica se o comentário foi editado' })
    @Expose()
    isEdited: boolean;

    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440999', description: 'ID do autor do comentário' })
    @Expose()
    userId: string;

    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440321', description: 'ID do post relacionado' })
    @Expose()
    postId: string;

    @ApiProperty({ example: '2024-01-20T12:34:56.000Z', description: 'Data de criação do comentário' })
    @Expose()
    createdAt: Date;

    @ApiProperty({ example: '2024-01-20T13:10:22.000Z', description: 'Data da última atualização do comentário' })
    @Expose()
    updatedAt: Date;
}