import { Exclude, Expose, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { ResponseCategoryDto } from "src/modules/categories/dto";
import { ResponseTagDto } from "src/modules/tags/dto";
import { ResponseUserDto } from "src/modules/users/dto";

@Exclude()
export class ResponseHighlightedPostDto {

  @ApiProperty()
  @Expose()
  postId: string;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty({ required: false })
  @Expose()
  image?: string;

  @ApiProperty()
  @Expose()
  highlightPost: number;

  @ApiProperty({ required: false })
  @Expose()
  publishedAt?: Date;

  @ApiProperty({ type: () => ResponseUserDto })
  @Expose()
  @Type(() => ResponseUserDto)
  user: ResponseUserDto;

  @ApiProperty({ type: () => [ResponseCategoryDto] })
  @Expose()
  @Type(() => ResponseCategoryDto)
  categories: ResponseCategoryDto[];

  @ApiProperty({ type: () => [ResponseTagDto] })
  @Expose()
  @Type(() => ResponseTagDto)
  tags: ResponseTagDto[];
}