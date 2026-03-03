import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard, RolesGuard } from '../users/utils/guards/exports';
import { ResponseCountDataDto } from 'src/common/base/base.dto';
import { Roles } from '../users/utils/decorators/roles.decorator';
import { plainToInstance } from 'class-transformer';
import { ResponseCommentDto } from './dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @HttpCode(201)
  @ApiCreatedResponse({ type: ResponseCommentDto })
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateCommentDto): Promise<ResponseCommentDto> {
    const comment = await this.commentsService.createComment(dto, dto.userId);
    return plainToInstance(ResponseCommentDto, comment.toJSON(), { excludeExtraneousValues: true });
  }

  @ApiOkResponse({ type: ResponseCommentDto })
  @Get('post/:postId')
  async list(@Param('postId') postId: string): Promise<ResponseCommentDto[]> {
    const comments = await this.commentsService.listByPost(postId);
    return plainToInstance(ResponseCommentDto, comments.map(comment => comment.toJSON()), { excludeExtraneousValues: true });
  }

  @ApiOkResponse({ type: ResponseCommentDto })
  @Get()
  async findAll(): Promise<ResponseCommentDto[]> {
    const comments = await this.commentsService.findAll();
    return plainToInstance(ResponseCommentDto, comments.map(comment => comment.toJSON()), { excludeExtraneousValues: true });
  }

  @ApiOkResponse({ type: ResponseCommentDto })
  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'AUTHOR', 'COMMENTATOR')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseCommentDto> {
    const comment = await this.commentsService.findOne(id);
    return plainToInstance(ResponseCommentDto, comment.toJSON(), { excludeExtraneousValues: true });
  }

  @ApiOkResponse({ type: ResponseCommentDto })
  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'AUTHOR', 'COMMENTATOR')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto): Promise<ResponseCommentDto> {
    const comment = await this.commentsService.update(id, updateCommentDto);
    return plainToInstance(ResponseCommentDto, comment.toJSON(), { excludeExtraneousValues: true });
  }


  @HttpCode(204)
  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'AUTHOR', 'COMMENTATOR')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.commentsService.remove(id);
  }

  @ApiOkResponse({ type: ResponseCountDataDto })
  @Get('count-resource')
  async count(): Promise<ResponseCountDataDto> {
    const count = await this.commentsService.countAllResource();
    return plainToInstance(ResponseCountDataDto, { count });
  }
}
