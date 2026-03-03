import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Post } from "src/modules/posts/entities/post.entity";
import { User } from "src/modules/users/entities/user.entity";

@Table({ tableName: 'tb_comments', timestamps: true })
export class Comment extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare commentId: CreationOptional<string>;

    @Column(DataType.TEXT)
    declare content: string;

    @Default(false)
    @Column({ type: DataType.BOOLEAN, allowNull: false })
    declare isEdited?: CreationOptional<boolean>;

    @Column({ type: DataType.DATE, allowNull: true })
    declare deletedAt?: CreationOptional<Date | null>;

    //relationships

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID })
    declare userId: string;

    @BelongsTo(() => User)
    declare user?: CreationOptional<User>; //author do comentario

    @ForeignKey(() => Post)
    @Column({ type: DataType.UUID })
    declare postId: string;

    @BelongsTo(() => Post)
    declare post?: CreationOptional<Post>;

}
