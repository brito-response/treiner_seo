import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { BeforeCreate, Column, DataType, Default, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import * as bcrypt from 'bcrypt';
import { Post } from "src/modules/posts/entities/post.entity";

export enum TypeUser { ADMIN = 'ADMIN', AUTHOR = 'AUTHOR', COMMENTATOR = 'COMMENTATOR' };
export function fromString(value: string): TypeUser {
    switch (value) {
        case 'ADMIN':
            return TypeUser.ADMIN;
        case 'AUTHOR':
            return TypeUser.AUTHOR;
        case 'COMMENTATOR':
            return TypeUser.COMMENTATOR;
        default:
            throw new Error('Tipo de usuário inválido.');
    };
};
export enum TypeUserStatus { ACTIVE = 'ACTIVE', SUSPENDED = 'SUSPENDED', BANNED = 'BANNED' };

@Table({ tableName: 'tb_users', timestamps: true })
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare userId: CreationOptional<string>;

    @Column(DataType.STRING)
    declare name: string;

    @Column({ type: DataType.STRING, unique: true })
    declare email: string;

    @Column({ type: DataType.STRING, unique: true })
    declare cpf: string;

    @Column(DataType.DATE)
    declare dateOfBirth: Date;

    @Column(DataType.STRING)
    declare password: string;

    @Column(DataType.STRING)
    declare phone: string;

    @Column(DataType.TEXT)
    declare photo: CreationOptional<string>;

    @Column(DataType.TEXT)
    declare bio: CreationOptional<string>;

    @Column(DataType.STRING)
    declare country: string;

    @Column(DataType.STRING)
    declare state: string;

    @Column(DataType.STRING)
    declare city: string;

    @Column(DataType.STRING)
    declare address: string;

    @Column({ type: DataType.ENUM(...Object.values(TypeUser)), defaultValue: TypeUser.COMMENTATOR })
    declare typeuser: CreationOptional<TypeUser>;

    @Column(DataType.ENUM(...Object.values(TypeUserStatus)))
    declare userStatus: CreationOptional<TypeUserStatus>;

    @Column(DataType.BOOLEAN)
    declare checked: CreationOptional<boolean>;

    @Column(DataType.DATE)
    declare lastLoginAt?: CreationOptional<Date>;

    // relationships (no atributes use "?"" e no CreationOptional)
    @HasMany(() => Post)
    declare posts?: CreationOptional<Post[]>;

    @HasMany(() => Post)
    declare comments?: CreationOptional<Comment[]>;

    //Listeners
    @BeforeCreate
    static async hashPassword(instance: User) {
        const salt = await bcrypt.genSalt(12);
        instance.userStatus = TypeUserStatus.ACTIVE;
        instance.password = await bcrypt.hash(instance.password, salt);
    };

};
