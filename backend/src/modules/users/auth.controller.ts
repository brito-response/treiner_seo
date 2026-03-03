import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiError } from '../../common/errors/api-error.class';
import { LoginResponse, LoginUserDto, RefreshDto } from './dto';
import { AuthService } from "./auth.service";
import { ApiOkResponse } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { ResponseRefresh } from './dto/refresh-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @ApiOkResponse({ type: LoginResponse })
    @HttpCode(200)
    @Post('login')
    async login(@Body() loginUsuarioDto: LoginUserDto): Promise<LoginResponse> {
        const { email, password, clientType } = loginUsuarioDto;
        if (!['web', 'mobile'].includes(clientType)) throw new ApiError('client type invalid', 400);
        return await this.authService.login(email, password, clientType);
    }

    @HttpCode(200)
    @Post('refresh')
    async refresh(@Body() body: RefreshDto) {
        const { refreshToken, clientType } = body;
        if (!refreshToken) throw new ApiError('refresh token is required', 400);
        if (!['web', 'mobile'].includes(clientType)) throw new ApiError('client type invalid', 400);
        const refreshed = await this.authService.gernerateOtherTokenWithRefreshToken(refreshToken, clientType);
        return plainToInstance(ResponseRefresh, refreshed, { excludeExtraneousValues: true });
    }
};
