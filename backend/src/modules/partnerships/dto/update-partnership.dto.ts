import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreatePartnershipDto } from './create-partnership.dto';

export class UpdatePartnershipDto extends PartialType(CreatePartnershipDto) {
    @ApiPropertyOptional({ example: 'https://meusite.com/imagens/nova-imagem.png', description: 'Nova imagem do post' })
    @IsString()
    @IsOptional()
    image?: string;
};
