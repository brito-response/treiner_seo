import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { BaseService } from 'src/common/base/base.service';
import { Comment } from './entities/comment.entity';
import { CommentsRepository } from './repository/comment.repository';
import { InferCreationAttributes } from 'sequelize';
import { ApiError } from 'src/common/errors/api-error.class';

@Injectable()
export class CommentsService extends BaseService<Comment, CreateCommentDto, UpdateCommentDto> {
  constructor(private readonly commentsRepository: CommentsRepository) {
    super(commentsRepository);
  }

  async createComment(dto: CreateCommentDto, userId: string) {
    return await this.commentsRepository.create({ ...dto, userId } as InferCreationAttributes<Comment>);
  }

  async listByPost(postId: string) {
    return this.commentsRepository.findByPost(postId);
  }

  async deleteComment(id: string, userId: string) {
    const comment = await this.commentsRepository.findOne(id);
    if (comment && comment.userId !== userId) throw new ApiError('Forbidden', 403);
    return await this.commentsRepository.softDelete(id);
  }
}
