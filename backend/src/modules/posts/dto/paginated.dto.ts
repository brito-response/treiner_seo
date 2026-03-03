import { Exclude, Expose } from "class-transformer";
import { ResponsePostDto } from "./response-post.dto";

@Exclude()
export class ResponsePaginatedPostsDto {
  @Expose()
  data: ResponsePostDto[];

  @Expose()
  count: number;
}