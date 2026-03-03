import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
    @ApiProperty({ description: 'Token JWT de acesso para autenticação nas rotas protegidas', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
    accessToken: string;

    @ApiProperty({ description: 'Token JWT para renovação do access token', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
    refreshToken: string;

    constructor(accessToken: string, refreshToken: string) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
