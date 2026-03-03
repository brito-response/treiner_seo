import { IsString } from "class-validator";

export class UpdatePostTagsDto {
  @IsString({ each: true })
  tagIds: string[];
}