import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { BelongsToMany, Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Post } from "src/modules/posts/entities/post.entity";
import { PostCategory } from "src/modules/posts/entities/postcategory.entity";

@Table({ tableName: 'tb_categories', timestamps: true })
export class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare categoryId: CreationOptional<string>;

    @Column(DataType.STRING)
    declare name: string;

    @Column({ type: DataType.STRING, unique: true })
    declare slug: string;

    @Column({ type: DataType.TEXT })
    declare description: string;

    @Column(DataType.STRING)
    declare icon?: CreationOptional<string>;

    @Column(DataType.BOOLEAN)
    declare isActive?: CreationOptional<boolean>;


    //relationships
    @BelongsToMany(() => Post, () => PostCategory)
    declare posts?: CreationOptional<Post[]>;
}
