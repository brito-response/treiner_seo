import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmailResetDto {
  @ApiProperty({ example: 'marcosmedeiros@gmail.com', description: 'Email válido' })
  @IsEmail({}, { message: 'E-mail inválido.' })
  email: string;
}
