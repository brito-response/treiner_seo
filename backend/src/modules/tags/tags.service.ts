import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { BaseService } from 'src/common/base/base.service';
import { Tag } from './entities/tag.entity';
import { TagsRepository } from './repository/tag.repository';
import { InferCreationAttributes } from 'sequelize';
import { ApiError } from 'src/common/errors/api-error.class';

@Injectable()
export class TagsService extends BaseService<Tag, CreateTagDto, UpdateTagDto> {
  constructor(private readonly tagsRepository: TagsRepository) {
    super(tagsRepository);
  }

  async createTag(dto: CreateTagDto) {
    await this.getBySlug(dto.slug);
    return this.create(dto as InferCreationAttributes<Tag>,);
  }

  async getBySlug(slug: string) {
    const tag = await this.tagsRepository.findBySlug(slug);
    if (!tag) throw new ApiError('Tag slug already exists', 400);
    return tag;
  }

  async getAll() {
    return await this.tagsRepository.findAllWithPosts();
  }
}
