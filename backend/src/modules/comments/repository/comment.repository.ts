import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/base/base.repository";
import { InjectModel } from "@nestjs/sequelize";
import { Comment } from "../entities/comment.entity";
import { Op } from "sequelize";

@Injectable()
export class CommentsRepository extends BaseRepository<Comment> {
    constructor(@InjectModel(Comment) private readonly commentModel: typeof Comment) {
        super(commentModel);
    }

    async buscarTodos(): Promise<Comment[]> {
        return this.findAll();
    }

    async findById(commentId: string): Promise<Partial<Comment> | null> {
        const comment = await this.commentModel.findByPk(commentId);
        if (!comment) return null;
        return comment.get({ plain: true }) as Partial<Comment>;
    }

    async getInstanceOfCommentById(id: string): Promise<Comment | null> {
        return await this.commentModel.findByPk(id);
    }

    async findByPost(postId: string) {
        return await this.commentModel.findAll({ where: { postId, deletedAt: { [Op.eq]: null } } });
    }


    async softDelete(commentId: string) {
        return await this.update(commentId, { deletedAt: new Date() });
    }

}