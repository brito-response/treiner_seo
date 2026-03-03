import { ApiProperty } from '@nestjs/swagger';
import { ResponseUserDto } from '.';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseUserPaginatedDto {
    @ApiProperty({ example: 100 })
    @Expose()
    count: number;

    @ApiProperty({ type: ResponseUserDto, isArray: true })
    @Expose()
    rows: ResponseUserDto[];
};