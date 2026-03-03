import type { CreationOptional, InferAttributes } from "sequelize";
import { BelongsToMany, Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Post } from "src/modules/posts/entities/post.entity";
import { PostTag } from "src/modules/posts/entities/posttag.entity";


@Table({ tableName: "tb_tags", timestamps: true })
export class Tag extends Model<InferAttributes<Tag>, InferAttributes<Tag>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare tagId: CreationOptional<string>;

    @Column(DataType.STRING)
    declare name: string;

    @Column(DataType.STRING)
    declare slug: string;

    @Column(DataType.STRING)
    declare description?: CreationOptional<string>;


    //relationships

    @BelongsToMany(() => Post, () => PostTag)
    declare posts?: CreationOptional<Post[]>;
}
