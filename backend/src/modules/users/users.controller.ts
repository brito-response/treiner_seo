import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Query, Req, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiConsumes, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard, RolesGuard } from './utils/guards/exports';
import { ApiError } from '../../common/errors/api-error.class';
import { Roles } from './utils/decorators/roles.decorator';
import { plainToInstance } from 'class-transformer';
import * as fs from 'fs/promises';
import { extname, join } from 'path';
import type { FastifyRequest } from 'fastify';
import { ResponseCountDataDto } from 'src/common/base/base.dto';
import { CreateUserDto, EmailResetDto, ResetPasswordDto, ResponseUserDto, ResponseUserPaginatedDto, UpdateUserDto, UpdateUserPasswordDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

   @HttpCode(201)
  @ApiCreatedResponse({ type: ResponseUserDto })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const { password, repeatPassword } = createUserDto;
    if (password !== repeatPassword) throw new ApiError('passwords do not match', 400);
    const user = await this.usersService.createRemovePassword(createUserDto);
    return plainToInstance(ResponseUserDto, user.toJSON(), { excludeExtraneousValues: true });
  }

  @ApiOkResponse({ type: ResponseUserDto, isArray: true })
  @ApiBearerAuth('jwt')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.usersService.findAll();
    return plainToInstance(ResponseUserDto, users.map(user => user.toJSON()), { excludeExtraneousValues: true });
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'AUTHOR', 'COMMENTATOR')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUserDto): Promise<ResponseUserDto> {
    const user = await this.usersService.update(id, updateUsuarioDto);
    return plainToInstance(ResponseUserDto, user.toJSON, { excludeExtraneousValues: true });
  }

  @ApiOkResponse({ type: ResponseUserDto, isArray: true })
  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'AUTHOR', 'COMMENTATOR')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id/password')
  async updatePassword(@Param('id') id: string, @Body() updateUserPassword: UpdateUserPasswordDto): Promise<ResponseUserDto> {
    return await this.usersService.updatePassword(id, updateUserPassword);
  }

  @Post('code-checked/:email')
  async sendEmailcheck(@Param('email') email: string): Promise<boolean> {
    return await this.usersService.sendEmailcheck(email);
  }

  @Get('code-checked/:email/:code')
  async getCheckEmail(@Param('email') email: string, @Param('code') code: string): Promise<boolean> {
    return await this.usersService.getCheckEmail(code, email);
  }

  @ApiOkResponse({ type: ResponseUserDto, isArray: true })
  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'AUTHOR', 'COMMENTATOR')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseUserDto> {
    const user = await this.usersService.findOne(id);
    return plainToInstance(ResponseUserDto, user.toJSON, { excludeExtraneousValues: true });
  }

  @ApiNoContentResponse({ description: 'resource deleted' })
  @ApiBearerAuth('jwt')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.usersService.remove(id);
  }

  @Post('email-reset-password')
  async sendEmailPassword(@Body() emailDto: EmailResetDto): Promise<boolean> {
    return await this.usersService.sendEmailWithHashResetPassword(emailDto.email);
  }

  @Put('reset-password')
  async redefinePassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<{ usuarioId: number }> {
    const { token, email, password, repassword } = resetPasswordDto;
    const redefinido = await this.usersService.redefinirSenha(token, email, password, repassword);
    return { usuarioId: redefinido };
  }

  @ApiOkResponse({ type: ResponseUserPaginatedDto })
  @ApiBearerAuth('jwt')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('paginate')
  async getPaginate(@Query('limit') limit: string = '10', @Query('offset') offset: string = '0'): Promise<ResponseUserPaginatedDto> {
    const limitNumber = Number(limit);
    const offsetNumber = Number(offset);
    if (isNaN(limitNumber) || isNaN(offsetNumber)) throw new ApiError('Invalid query parameters, not numbers.', 400);
    const { count, rows } = await this.usersService.listarPaginado(limitNumber, offsetNumber);
    return { count, rows: plainToInstance(ResponseUserDto, rows.map(user => user.toJSON()), { excludeExtraneousValues: true }) };
  }

  @ApiOkResponse({ type: ResponseUserDto, isArray: true })
  @ApiBearerAuth('jwt')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('typeof')
  async getAllUsers(@Query('tipouser') tipouser: string): Promise<ResponseUserDto[]> {
    const users = await this.usersService.getUsersOfType(tipouser);
    return plainToInstance(ResponseUserDto, users.map(user => user.toJSON()), { excludeExtraneousValues: true });
  }

  @ApiOkResponse({ type: ResponseCountDataDto })
  @Get('count-resource')
  async count(): Promise<ResponseCountDataDto> {
    const count = await this.usersService.countAllResource();
    return { count } as ResponseCountDataDto;
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'AUTHOR', 'COMMENTATOR')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id/photo')
  @ApiConsumes('multipart/form-data')
  async uploadPhoto(@Param('id') id: string, @Req() req: FastifyRequest) {
    const file = await req.file(); // Fastify retorna aqui o arquivo

    if (!file) throw new ApiError('No photo sent', 400);

    const buffer = await file.toBuffer();
    const ext = extname(file.filename);
    const newName = `photo-${Date.now()}-${Math.random().toString(36).substring(2)}${ext}`;

    const uploadDir = join(process.cwd(), 'uploads/users/profile');
    await fs.mkdir(uploadDir, { recursive: true });

    const uploadPath = join(uploadDir, newName);
    await fs.writeFile(uploadPath, buffer);

    const filePath = `/uploads/users/profile/${newName}`;

    return await this.usersService.addPhoto(id, filePath);
  }
}
