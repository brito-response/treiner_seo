import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Req, DefaultValuePipe, ParseIntPipe, Query, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiBearerAuth, ApiConsumes, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Roles } from '../users/utils/decorators/roles.decorator';
import { JwtAuthGuard } from '../users/utils/guards/jwt.guard';
import { RolesGuard } from '../users/utils/guards/roles.guard';
import { CreatePostDto, FindPostsQueryDto, ResponseHighlightedPostDto, ResponsePaginatedPostsDto, ResponsePostDto, SetCategoriesDto, SetTagsDto, UpdatePostDto, UserIdDto } from './dto';
import { plainToInstance } from 'class-transformer';
import { ApiError } from 'src/common/errors/api-error.class';
import { ResponseCountDataDto } from 'src/common/base/base.dto';
import * as fs from 'fs/promises';
import { extname, join } from 'path';
import type { FastifyRequest } from 'fastify';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @HttpCode(201)
  @ApiCreatedResponse({ type: ResponsePostDto })
  @ApiBearerAuth('jwt')
  @Roles('AUTHOR', 'ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() dto: CreatePostDto): Promise<ResponsePostDto> {
    const postCreated = await this.postsService.createPost(dto, dto.userId);
    return plainToInstance(ResponsePostDto, postCreated.toJSON(), { excludeExtraneousValues: true });
  }

  @ApiOkResponse({ type: ResponsePostDto, isArray: true })
  @Get()
  async getAll(): Promise<ResponsePostDto[]> {
    const posts = await this.postsService.findAll();
    return plainToInstance(ResponsePostDto, posts.map(user => user.toJSON()), { excludeExtraneousValues: true });
  }

  @Get('public')
  async list(@Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number, @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number) {
    return await this.postsService.listPublic(limit, offset);
  }

  @ApiOkResponse({ type: ResponsePaginatedPostsDto })
  @Get('filtered')
  async findAllFiltered(@Query() query: FindPostsQueryDto): Promise<ResponsePaginatedPostsDto> {
    const { rows, count } = await this.postsService.findAllByQuery(query);

    const mappedRows = plainToInstance(ResponsePostDto, rows, { excludeExtraneousValues: true });
    return plainToInstance(ResponsePaginatedPostsDto, { rows: mappedRows, count }, { excludeExtraneousValues: true });
  }

  @ApiOkResponse({ type: ResponseCountDataDto })
  @Get('count-resource')
  async count(): Promise<ResponseCountDataDto> {
    const count = await this.postsService.countAllResource();
    return plainToInstance(ResponseCountDataDto, { count });
  }

  @Get('highlighted/top')
  async getMostHighlighted(): Promise<ResponseHighlightedPostDto> {
    const post = await this.postsService.getMostHighlighted();
    return plainToInstance(ResponseHighlightedPostDto, post.toJSON(), { excludeExtraneousValues: true });
  }

  @ApiOkResponse({ type: ResponseHighlightedPostDto, isArray: true })
  @Get('highlighted/top6')
  async getTopHighlighted(): Promise<ResponseHighlightedPostDto[]> {
    const posts = await this.postsService.getTopHighlighted();
    return plainToInstance(ResponseHighlightedPostDto, posts.map(post => post.toJSON()), { excludeExtraneousValues: true });
  }

  @ApiOkResponse({ type: ResponsePostDto, isArray: true })
  @Get(':id')
  async getById(@Param('id') id: string): Promise<ResponsePostDto> {
    const post = await this.postsService.findOne(id);
    return plainToInstance(ResponsePostDto, post.toJSON(), { excludeExtraneousValues: true });
  }

  @ApiBearerAuth('jwt')
  @Roles('AUTHOR', 'ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOkResponse({ type: ResponsePostDto })
  @Patch(':id')
  async updateById(@Param('id') id: string, @Body() dto: UpdatePostDto): Promise<ResponsePostDto> {
    const post = await this.postsService.updatePartial(id, dto);
    return plainToInstance(ResponsePostDto, post.toJSON(), { excludeExtraneousValues: true });
  }

  @HttpCode(204)
  @ApiBearerAuth('jwt')
  @Roles('AUTHOR')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req): Promise<void> {
    await this.postsService.remove(id);
  }

  @ApiBearerAuth('jwt')
  @Roles('AUTHOR')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id/publish')
  async publish(@Param('id') id: string, @Body() dto: UserIdDto) {
    return await this.postsService.publishPost(id, dto.userId);
  }

  @ApiOkResponse({ type: ResponsePostDto })
  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'AUTHOR')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id/photo')
  @ApiConsumes('multipart/form-data')
  async uploadPhoto(@Param('id') id: string, @Req() req: FastifyRequest): Promise<ResponsePostDto> {
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
    const postUpdated = await this.postsService.addPhotoOfPost(id, filePath);
    return plainToInstance(ResponsePostDto, postUpdated.toJSON(), { excludeExtraneousValues: true });
  }

  @ApiOkResponse({ type: ResponsePostDto })
  @Patch(':id/tags')
  @ApiBearerAuth('jwt')
  @Roles('AUTHOR', 'ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async setTags(@Param('id') id: string, @Body() dto: SetTagsDto): Promise<ResponsePostDto> {
    const post = await this.postsService.setTags(id, dto.tagIds, dto.userId);
    return plainToInstance(ResponsePostDto, post.toJSON(), { excludeExtraneousValues: true });
  }

  @ApiOkResponse({ type: ResponsePostDto })
  @Patch(':id/categories')
  @ApiBearerAuth('jwt')
  @Roles('AUTHOR', 'ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async setCategories(@Param('id') id: string, @Body() dto: SetCategoriesDto): Promise<ResponsePostDto> {
    const post = await this.postsService.setCategories(id, dto.categoryIds, dto.userId);
    return plainToInstance(ResponsePostDto, post.toJSON(), { excludeExtraneousValues: true });
  }

  @ApiBearerAuth('jwt')
  @Roles('AUTHOR', 'ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id/highlight')
  async highlight(@Param('id') id: string): Promise<void> {
    await this.postsService.highlightPost(id);
  }


}
