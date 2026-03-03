import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { BeforeCreate, BelongsTo, BelongsToMany, Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { PostCategory } from "./postcategory.entity";
import { PostTag } from "./posttag.entity";
import { Category } from "src/modules/categories/entities/category.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Tag } from "src/modules/tags/entities/tag.entity";
import { Comment } from "src/modules/comments/entities/comment.entity";

export enum PostStatus { DRAFT = 'DRAFT', PUBLISHED = 'PUBLISHED' };

@Table({ tableName: 'tb_posts', timestamps: true })
export class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare postId: CreationOptional<string>;

    @Column(DataType.STRING)
    declare title: string;

    @Column(DataType.TEXT)
    declare image?: CreationOptional<string>;

    @Column(DataType.TEXT)
    declare content: string;

    @Column(DataType.ENUM(...Object.values(PostStatus)))
    declare status: CreationOptional<PostStatus>;

    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    declare highlightPost?: CreationOptional<number>;

    @Column(DataType.DATE)
    declare publishedAt?: CreationOptional<Date>;

    @Column(DataType.DATE)
    declare deletedAt?: CreationOptional<Date>; // soft delete

    //relationships

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID })
    declare userId: string;

    @BelongsTo(() => User)
    declare user?: CreationOptional<User>; //author

    @HasMany(() => Comment)
    declare comments?: CreationOptional<Comment[]>;

    @BelongsToMany(() => Category, () => PostCategory)
    declare categories?: CreationOptional<Category[]>;

    @BelongsToMany(() => Tag, () => PostTag)
    declare tags?: CreationOptional<Tag[]>;

    //Listeners
    @BeforeCreate
    static async createTypeStatus(instance: Post) {
        instance.status = PostStatus.DRAFT;
    };

};
