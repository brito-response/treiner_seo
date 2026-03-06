import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/base/base.repository";
import { InjectModel } from "@nestjs/sequelize";
import { InferCreationAttributes } from "sequelize";
import { Partnership } from "../entities/partnerships.entity";

@Injectable()
export class PartnershipsRepository extends BaseRepository<Partnership> {
    constructor(@InjectModel(Partnership) private readonly partnershipModel: typeof Partnership) {
        super(partnershipModel);
    }

    async createPost(data: InferCreationAttributes<Partnership>) {
        return await this.create(data);
    }

    async buscarTodos(): Promise<Partnership[]> {
        return this.findAll();
    }

    async findById(PostId: string): Promise<Partial<Partnership> | null> {
        const Post = await this.partnershipModel.findByPk(PostId);
        if (!Post) return null;
        return Post.get({ plain: true }) as Partial<Partnership>;
    }

    async getInstanceOfPostById(id: string): Promise<Partnership | null> {
        return await this.partnershipModel.findByPk(id);
    }
}