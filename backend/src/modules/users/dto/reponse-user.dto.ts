import { Exclude, Expose } from "class-transformer";
import { TypeUser, TypeUserStatus } from "../entities/user.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

@Exclude()
export class ResponseUserDto {

    @ApiProperty({ format: 'uuid' })
    @Expose()
    userId: string;

    @ApiProperty({ example: 'João Silva' })
    @Expose()
    name: string;

    @ApiProperty({ example: 'joao@email.com' })
    @Expose()
    email: string;

    @ApiProperty({ example: '+55 11 99999-9999' })
    @Expose()
    phone: string;

    @ApiPropertyOptional({ example: 'https://cdn.app.com/avatar.png' })
    @Expose()
    photo?: string;

    @ApiPropertyOptional({ example: 'Desenvolvedor full stack' })
    @Expose()
    bio?: string;

    @ApiProperty({ example: 'Brasil' })
    @Expose()
    country: string;

    @ApiProperty({ example: 'SP' })
    @Expose()
    state: string;

    @ApiProperty({ example: 'São Paulo' })
    @Expose()
    city: string;

    @ApiProperty({ example: 'Av. Paulista, 1000' })
    @Expose()
    address: string;

    @ApiProperty({ enum: TypeUser, example: TypeUser.AUTHOR })
    @Expose()
    typeuser: TypeUser;

    @ApiProperty({ enum: TypeUserStatus, example: TypeUserStatus.ACTIVE })
    @Expose()
    userStatus: TypeUserStatus;

    @ApiProperty({ example: true })
    @Expose()
    checked: boolean;

    @ApiPropertyOptional({ type: String, format: 'date-time', example: '2025-01-01T12:00:00.000Z' })
    @Expose()
    lastLoginAt?: Date;

    @ApiProperty({ type: String, format: 'date-time' })
    @Expose()
    createdAt?: Date;

    @ApiProperty({ type: String, format: 'date-time' })
    @Expose()
    updatedAt?: Date;
}