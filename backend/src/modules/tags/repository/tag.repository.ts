import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/base/base.repository";
import { InjectModel } from "@nestjs/sequelize";
import { Tag } from "../entities/tag.entity";
import { Post } from "src/modules/posts/entities/post.entity";

@Injectable()
export class TagsRepository extends BaseRepository<Tag> {
    constructor(@InjectModel(Tag) private readonly tagModel: typeof Tag) {
        super(tagModel);
    }

    async buscarTodos(): Promise<Tag[]> {
        return this.findAll();
    }

    async findById(TagId: string): Promise<Partial<Tag> | null> {
        const Tag = await this.tagModel.findByPk(TagId);
        if (!Tag) return null;
        return Tag.get({ plain: true }) as Partial<Tag>;
    }

    async getInstanceOfTagById(id: string): Promise<Tag | null> {
        return await this.tagModel.findByPk(id);
    }

    async findBySlug(slug: string) {
        return await this.tagModel.findOne({ where: { slug } });
    }

    async findAllWithPosts() {
        return await this.tagModel.findAll({ include: [Post] });
    }

}