import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePartnershipDto {

    @ApiProperty({ example: 'Loja do Zé', description: 'Nome do negócio parceiro' })
    @IsString()
    @IsNotEmpty()
    businessName: string;

    @ApiProperty({ example: '83999999999', description: 'Whatsapp da empresa' })
    @IsString()
    @IsNotEmpty()
    whatsapp: string;

    @ApiProperty({ example: 'https://lojadoze.com', description: 'Site da empresa', required: false })
    @IsString()
    @IsOptional()
    website?: string;

    @ApiProperty({ example: 'Rua João Pessoa, Centro - Santa Luzia', description: 'Endereço do estabelecimento' })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({ example: 'Loja especializada em roupas e acessórios.', description: 'Descrição do parceiro' })
    @IsString()
    @IsNotEmpty()
    description: string;

}