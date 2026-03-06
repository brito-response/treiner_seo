import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Req } from '@nestjs/common';
import { PartnershipsService } from './partnerships.service';
import { ApiBearerAuth, ApiConsumes, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Roles } from '../users/utils/decorators/roles.decorator';
import { JwtAuthGuard } from '../users/utils/guards/jwt.guard';
import { RolesGuard } from '../users/utils/guards/roles.guard';
import { plainToInstance } from 'class-transformer';
import { ApiError } from 'src/common/errors/api-error.class';
import { ResponseCountDataDto } from 'src/common/base/base.dto';
import * as fs from 'fs/promises';
import { extname, join } from 'path';
import type { FastifyRequest } from 'fastify';
import { CreatePartnershipDto, ResponsePartnershipDto, UpdatePartnershipDto } from './dto';

@Controller('partnerships')
export class PartnershipsController {
  constructor(private readonly partnershipService: PartnershipsService) { }

  @HttpCode(201)
  @ApiCreatedResponse({ type: ResponsePartnershipDto })
  @ApiBearerAuth('jwt')
  @Roles('AUTHOR', 'ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() dto: CreatePartnershipDto): Promise<ResponsePartnershipDto> {
    const postCreated = await this.partnershipService.create(dto);
    return plainToInstance(ResponsePartnershipDto, postCreated.toJSON(), { excludeExtraneousValues: true });
  }

  @ApiOkResponse({ type: ResponsePartnershipDto, isArray: true })
  @Get()
  async getAll(): Promise<ResponsePartnershipDto[]> {
    const posts = await this.partnershipService.findAll();
    return plainToInstance(ResponsePartnershipDto, posts.map(user => user.toJSON()), { excludeExtraneousValues: true });
  }

  @ApiOkResponse({ type: ResponseCountDataDto })
  @Get('count-resource')
  async count(): Promise<ResponseCountDataDto> {
    const count = await this.partnershipService.countAllResource();
    return plainToInstance(ResponseCountDataDto, { count });
  }

  @ApiOkResponse({ type: ResponsePartnershipDto, isArray: true })
  @Get(':id')
  async getById(@Param('id') id: string): Promise<ResponsePartnershipDto> {
    const post = await this.partnershipService.findOne(id);
    return plainToInstance(ResponsePartnershipDto, post.toJSON(), { excludeExtraneousValues: true });
  }

  @ApiBearerAuth('jwt')
  @Roles('AUTHOR', 'ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOkResponse({ type: ResponsePartnershipDto })
  @Patch(':id')
  async updateById(@Param('id') id: string, @Body() dto: UpdatePartnershipDto): Promise<ResponsePartnershipDto> {
    const post = await this.partnershipService.updatePartial(id, dto);
    return plainToInstance(ResponsePartnershipDto, post.toJSON(), { excludeExtraneousValues: true });
  }

  @HttpCode(204)
  @ApiBearerAuth('jwt')
  @Roles('AUTHOR')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req): Promise<void> {
    await this.partnershipService.remove(id);
  }

  @ApiOkResponse({ type: ResponsePartnershipDto })
  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'AUTHOR')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id/photo')
  @ApiConsumes('multipart/form-data')
  async uploadPhoto(@Param('id') id: string, @Req() req: FastifyRequest): Promise<ResponsePartnershipDto> {
    const file = await req.file();
    if (!file) throw new ApiError('No photo sent', 400);

    const buffer = await file.toBuffer();
    const ext = extname(file.filename);
    const newName = `photo-${Date.now()}-${Math.random().toString(36).substring(2)}${ext}`;

    const uploadDir = join(process.cwd(), 'uploads/posts');
    await fs.mkdir(uploadDir, { recursive: true });

    const uploadPath = join(uploadDir, newName);
    await fs.writeFile(uploadPath, buffer);

    const filePath = `/uploads/posts/${newName}`;
    const postUpdated = await this.partnershipService.addPhotoOfPost(id, filePath);
    return plainToInstance(ResponsePartnershipDto, postUpdated.toJSON(), { excludeExtraneousValues: true });
  }
}
