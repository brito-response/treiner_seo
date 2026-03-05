import { Exclude, Expose, Type } from "class-transformer";
import { ApiProperty } from '@nestjs/swagger';
import { ResponsePostQueryDto } from "./respose-query.dto";

@Exclude()
export class ResponsePaginatedPostsDto {
  @ApiProperty({ type: () => ResponsePostQueryDto, isArray: true })
  @Expose()
  @Type(() => ResponsePostQueryDto)
  data: ResponsePostQueryDto[];

  @ApiProperty({ example: 100, description: 'Total de registros encontrados' })
  @Expose()
  count: number;
}