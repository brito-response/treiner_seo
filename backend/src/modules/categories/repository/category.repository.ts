import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/base/base.repository";
import { InjectModel } from "@nestjs/sequelize";
import { Category } from "../entities/category.entity";
import { Post } from "src/modules/posts/entities/post.entity";

@Injectable()
export class CategoriesRepository extends BaseRepository<Category> {
    constructor(@InjectModel(Category) private readonly categoryModel: typeof Category) {
        super(categoryModel);
    }

    async buscarTodos(): Promise<Category[]> {
        return this.findAll();
    }

    async findById(categoryId: string): Promise<Partial<Category> | null> {
        const category = await this.categoryModel.findByPk(categoryId);
        if (!category) return null;
        return category.get({ plain: true }) as Partial<Category>;
    }

    async getInstanceOfCategoryById(id: string): Promise<Category | null> {
        return await this.categoryModel.findByPk(id);
    }

    async findBySlug(slug: string) {
        return await this.categoryModel.findOne({ where: { slug } });
    }

    async findActive() {
        return await this.categoryModel.findAll({ where: { isActive: true } });
    }

    async findOneWithAllPosts(categoryId: string): Promise<Category | null> {
        return this.categoryModel.findOne({
            where: { categoryId },
            include: [
                {
                    model: Post,
                    through: {
                        attributes: [],
                    },
                },
            ],
        });
    }

}