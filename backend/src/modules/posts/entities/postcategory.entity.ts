import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Post } from "./post.entity";
import { Category } from "src/modules/categories/entities/category.entity";

export enum PostStatus { DRAFT = 'DRAFT', PUBLISHED = 'PUBLISHED' };

@Table({ tableName: 'tb_postcategories', timestamps: true })
export class PostCategory extends Model<InferAttributes<PostCategory>, InferCreationAttributes<PostCategory>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare postCategoryId: CreationOptional<string>;

    @ForeignKey(() => Post)
    @Column({ type: DataType.UUID })
    declare postId: string;

    @ForeignKey(() => Category)
    @Column({ type: DataType.UUID })
    declare categoryId: string;

    //relationships
    @BelongsTo(() => Post)
    declare post?: CreationOptional<Post>;

    @BelongsTo(() => Category)
    declare category?: CreationOptional<Category>;

}   
