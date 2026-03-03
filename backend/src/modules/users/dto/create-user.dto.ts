import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ description: 'Nome do usuário', example: "marcos" })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ description: 'Email do usuário', example: "marcosmedeiros@gmail.com" })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'CPF do usuário', example: "11900986431" })
    @IsNotEmpty()
    @IsString()
    cpf: string;

    @ApiProperty({ description: 'Data de nascimento do usuário (YYYY-MM-DD)', example: '1995-03-05' })
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    dateOfBirth: Date;

    @ApiProperty({ description: 'Senha do usuário', minLength: 6, example: "Marcos3000#" })
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiProperty({ description: 'Repetição da senha para validação', minLength: 6, example: "Marcos3000#" })
    @IsNotEmpty()
    @MinLength(6)
    repeatPassword: string;

    @ApiPropertyOptional({ description: 'Telefone do usuário', example: "8483432421" })
    @IsOptional()
    @IsString()
    phone: string;

    @ApiProperty({ description: 'País do usuário', example: "Brasil" })
    @IsNotEmpty()
    @IsString()
    country: string;

    @ApiProperty({ description: 'Estado do usuário', example: "RN" })
    @IsNotEmpty()
    @IsString()
    state: string;

    @ApiProperty({ description: 'Cidade do usuário', example: "Caicó" })
    @IsNotEmpty()
    @IsString()
    city: string;

    @ApiProperty({ description: 'Endereço da Rua do usuário', example: "R manoel silvano de medeiros 284" })
    @IsNotEmpty()
    @IsString()
    address: string;
};
