import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

export class HttpExceptionMessageDto {
    @ApiProperty({ example: 'Token não informado' })
    message: string;

    @ApiProperty({ example: 'Unauthorized' })
    error: string;

    @ApiProperty({ example: 0 })
    statusCode: number;
}

export class ResponseErrorDto {
    @ApiProperty({ example: 0 })
    statusCode: number;

    @ApiProperty({ type: String, format: 'date-time', example: '2026-01-22T19:47:39.433Z' })
    timestamp: string;

    @ApiProperty({ example: '/resources' })
    path: string;

    @ApiProperty({ oneOf: [{ type: 'string' }, { type: typeof HttpExceptionMessageDto }] })
    message: string | HttpExceptionMessageDto;
};

@Exclude()
export class ResponseCountDataDto {
    @ApiProperty({example: 10,description: "Quantidade total de registros"})
    @Expose()
    count: number;
};
