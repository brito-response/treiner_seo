import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ResponseCountDataDto } from 'src/common/base/base.dto';
import { ResponseCategoryDto, ResponseCategoryWithPostsDto } from './dto';
import { JwtAuthGuard, RolesGuard } from '../users/utils/guards/exports';
import { Roles } from '../users/utils/decorators/roles.decorator';
import { plainToInstance } from 'class-transformer';
import { ResponsePostDto } from '../posts/dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @ApiCreatedResponse({ type: ResponseCategoryDto })
  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'AUTHOR')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<ResponseCategoryDto> {
    const categoria = await this.categoriesService.create(createCategoryDto);
    return plainToInstance(ResponseCategoryDto, categoria.toJSON(), { excludeExtraneousValues: true });
  }

  @ApiOkResponse({ type: ResponseCategoryDto, isArray: true })
  @Get()
  async findAll(): Promise<ResponseCategoryDto[]> {
    const categorias = await this.categoriesService.findAll();
    return plainToInstance(ResponseCategoryDto, categorias.map(categoria => categoria.toJSON()), { excludeExtraneousValues: true });
  }

  @ApiOkResponse({ type: ResponseCategoryWithPostsDto })
  @Get(':id/posts')
  async findOneWithAllPosts(@Param('id') id: string): Promise<ResponseCategoryWithPostsDto> {
    const postWithCstegories = await this.categoriesService.findOneWithAllPosts(id);
    return plainToInstance(ResponseCategoryWithPostsDto, { ...postWithCstegories.toJSON(), posts: postWithCstegories.posts?.map(post => plainToInstance(ResponsePostDto, post.toJSON(), { excludeExtraneousValues: true })) }, { excludeExtraneousValues: true });
  }

  @Get("actives")
  async listActive() {
    return await this.categoriesService.listActive();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.categoriesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoriesService.update(id, updateCategoryDto);
  }

  @HttpCode(204)
  @ApiBearerAuth('jwt')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.categoriesService.remove(id);
  }

  @ApiOkResponse({ type: ResponseCountDataDto })
  @Get('count-resource')
  async count(): Promise<ResponseCountDataDto> {
    const count = await this.categoriesService.countAllResource();
    return plainToInstance(ResponseCountDataDto, { count });
  }

}
