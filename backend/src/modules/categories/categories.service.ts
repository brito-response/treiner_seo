import { Injectable } from '@nestjs/common';
import { ApiError } from 'src/common/errors/api-error.class';
import { CategoriesRepository } from './repository/category.repository';
import { Category } from './entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { BaseService } from 'src/common/base/base.service';

@Injectable()
export class CategoriesService extends BaseService<Category, CreateCategoryDto, UpdateCategoryDto> {
  constructor(private readonly categoriesRepository: CategoriesRepository) {
    super(categoriesRepository);
  }

  async createCategory(dto: CreateCategoryDto) {
    const exists = await this.categoriesRepository.findBySlug(dto.slug);
    if (exists) throw new ApiError('Category slug already exists', 400);
    return await this.create(dto);
  }

  async listActive() {
    return await this.categoriesRepository.findActive();
  }

  async toggleActive(id: string, isActive: boolean) {
    return await this.categoriesRepository.update(id, { isActive });
  }

  async findOneWithAllPosts(categoryId: string): Promise<Category> {
    const categoria = await this.categoriesRepository.findOneWithAllPosts(categoryId);
    if (!categoria) throw new ApiError("category not found", 404)
    return categoria;
  }
}
