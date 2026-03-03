import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/base/base.repository";
import { InjectModel } from "@nestjs/sequelize";
import { Post, PostStatus } from "../entities/post.entity";
import { InferCreationAttributes, Op } from "sequelize";
import { FindPostsQueryDto } from "../dto/find-query-post.dto";
import { Tag } from "src/modules/tags/entities/tag.entity";
import { Category } from "src/modules/categories/entities/category.entity";
import { User } from "src/modules/users/entities/user.entity";

@Injectable()
export class PostsRepository extends BaseRepository<Post> {
    constructor(@InjectModel(Post) private readonly postModel: typeof Post) {
        super(postModel);
    }

    async createPost(data: InferCreationAttributes<Post>) {
        return await this.create(data);
    }

    async buscarTodos(): Promise<Post[]> {
        return this.findAll();
    }

    async findById(PostId: string): Promise<Partial<Post> | null> {
        const Post = await this.postModel.findByPk(PostId);
        if (!Post) return null;
        return Post.get({ plain: true }) as Partial<Post>;
    }

    async getInstanceOfPostById(id: string): Promise<Post | null> {
        return await this.postModel.findByPk(id);
    }

    async findPublished(limit: number, offset: number) {
        return await this.findWithPagination(limit, offset, {
            where: { status: PostStatus.PUBLISHED, deletedAt: null },
            include: [User, Category, Tag],
        });
    }

    async findByAuthor(userId: string) {
        return await this.postModel.findAll({ where: { userId } });
    }


    async publish(postId: string) {
        return await this.update(postId, { status: PostStatus.PUBLISHED, publishedAt: new Date(), });
    }


    async softDelete(postId: string) {
        return await this.update(postId, { deletedAt: new Date() });
    }

    async findByQuery(query: FindPostsQueryDto): Promise<{ rows: Post[]; count: number }> {
        const { status, userId, categoryId, tagId, search, orderBy = 'createdAt', order = 'DESC', page = 1, limit = 10 } = query;
        const where: any = { deletedAt: null };
        if (status) { where.status = status; }
        if (userId) { where.userId = userId; }
        if (search) {
            where[Op.or] = [
                { title: { [Op.iLike]: `%${search}%` } },
                { content: { [Op.iLike]: `%${search}%` } },
            ];
        }

        const include: any[] = [{ model: User }, { model: Category, through: { attributes: [] } }, { model: Tag, through: { attributes: [] } }];
        if (categoryId) { include.push({ model: Category, where: { categoryId }, through: { attributes: [] } }) };

        if (tagId) { include.push({ model: Tag, where: { tagId }, through: { attributes: [] } }) };

        const offset = (page - 1) * limit;
        return await this.findWithPagination(limit, offset, { where, include, order: [[orderBy, order]], distinct: true });
    }

    async setTags(postId: string, tagIds: string[]): Promise<boolean> {
        const post = await this.postModel.findByPk(postId);
        if (!post) return false;

        await post.$set('tags', tagIds);
        return true;
    }

    async setCategories(postId: string, categoryIds: string[]): Promise<boolean> {
        const post = await this.postModel.findByPk(postId);
        if (!post) return false;

        await post.$set('categories', categoryIds);
        return true;
    }

    async incrementHighlight(postId: string): Promise<Post | null> {
        const post = await this.postModel.findByPk(postId);
        if (!post) return null;
        await post.increment('highlightPost', { by: 1 });
        await post.reload();
        return post;
    }

    async findMostHighlighted(): Promise<Post | null> {
        return await this.postModel.findOne({
            where: { status: PostStatus.PUBLISHED, highlightPost: { [Op.gt]: 0, } },
            order: [['highlightPost', 'DESC']],
            include: [{ model: User }, { model: Category, through: { attributes: [] } }, { model: Tag, through: { attributes: [] } }],
        });
    }

    async findTopHighlighted(limit: number = 6): Promise<Post[]> {
        const posts = await this.postModel.findAll({
            where: { status: PostStatus.PUBLISHED, highlightPost: { [Op.gt]: 0 }, },
            order: [['highlightPost', 'DESC']],
            limit,
            include: [{ model: User }, { model: Category, through: { attributes: [] } }, { model: Tag, through: { attributes: [] } }],
        });
        return posts ?? [];
    }
}