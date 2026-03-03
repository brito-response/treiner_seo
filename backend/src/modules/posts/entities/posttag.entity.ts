import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Post } from "./post.entity";
import { Tag } from "src/modules/tags/entities/tag.entity";

export enum PostStatus { DRAFT = 'DRAFT', PUBLISHED = 'PUBLISHED' };

@Table({ tableName: 'tb_posttags', timestamps: true })
export class PostTag extends Model<InferAttributes<PostTag>, InferCreationAttributes<PostTag>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare postTagId: CreationOptional<string>;

    @ForeignKey(() => Post)
    @Column({ type: DataType.UUID })
    declare postId: string;

    @ForeignKey(() => Tag)
    @Column({ type: DataType.UUID })
    declare tagId: string;

    //relationships
    @BelongsTo(() => Post)
    declare post?: CreationOptional<Post>;

    @BelongsTo(() => Tag)
    declare tag?: CreationOptional<Tag>;

}   
