import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { Roles } from '../users/utils/decorators/roles.decorator';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../users/utils/guards/jwt.guard';
import { RolesGuard } from '../users/utils/guards/roles.guard';
import { ResponseTagDto } from './dto';
import { ResponseCountDataDto, ResponseErrorDto } from 'src/common/base/base.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) { }

  @ApiCreatedResponse({ type: ResponseTagDto })
  @ApiBearerAuth('jwt')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createTagDto: CreateTagDto): Promise<ResponseTagDto> {
    const tag = await this.tagsService.createTag(createTagDto);
    return plainToInstance(ResponseTagDto, tag.toJSON(), { excludeExtraneousValues: true });
  }

  @ApiOkResponse({ type: ResponseTagDto, isArray: true })
  @Get()
  async findAll(): Promise<ResponseTagDto[]> {
    const tags = await this.tagsService.findAll();
    return plainToInstance(ResponseTagDto, tags.map(tag => tag.toJSON()), { excludeExtraneousValues: true });
  }

  @ApiOkResponse({ type: ResponseTagDto })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseTagDto> {
    const tag = await this.tagsService.findOne(id);
    return plainToInstance(ResponseTagDto, tag.toJSON(), { excludeExtraneousValues: true });
  }

  @ApiOkResponse({ type: ResponseTagDto })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto): Promise<ResponseTagDto> {
    const tag = await this.tagsService.update(id, updateTagDto);
    return plainToInstance(ResponseTagDto, tag.toJSON(), { excludeExtraneousValues: true });
  }

  @HttpCode(204)
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ type: ResponseErrorDto })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.tagsService.remove(id);
  }

  @ApiOkResponse({ type: ResponseCountDataDto })
  @Get('count-resource')
  async count(): Promise<ResponseCountDataDto> {
    const count = await this.tagsService.countAllResource();
    return { count } as ResponseCountDataDto;
  }
}
