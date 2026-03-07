import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponsePartnershipDto {

    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001', description: 'ID da parceria' })
    @Expose()
    partnershipId: string;

    @ApiProperty({ example: 'Loja do Zé', description: 'Nome do negócio parceiro' })
    @Expose()
    businessName: string;

    @ApiPropertyOptional({ example: '/uploads/partnerships/logo.png', description: 'Logo da empresa' })
    @Expose()
    logo?: string;

    @ApiProperty({ example: '83999999999', description: 'Whatsapp da empresa' })
    @Expose()
    whatsapp: string;

    @ApiPropertyOptional({ example: 'https://lojadoze.com', description: 'Site da empresa' })
    @Expose()
    website?: string;

    @ApiProperty({ example: 'Rua João Pessoa, Centro - Santa Luzia', description: 'Endereço do estabelecimento' })
    @Expose()
    address: string;

    @ApiProperty({ example: 'Loja especializada em roupas e acessórios.', description: 'Descrição do parceiro' })
    @Expose()
    description: string;

    @ApiProperty({ example: '2024-01-19T09:00:00.000Z', description: 'Data de criação' })
    @Expose()
    createdAt: Date;

    @ApiProperty({ example: '2024-01-21T15:30:00.000Z', description: 'Data da última atualização' })
    @Expose()
    updatedAt: Date;

}