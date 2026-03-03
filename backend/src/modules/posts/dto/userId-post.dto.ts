import { IsUUID } from "class-validator";

export class UserIdDto {
    @IsUUID('4', { each: true })
    userId: string;
};