import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({ tableName: 'tb_partnerships', timestamps: true })
export class Partnership extends Model<InferAttributes<Partnership>, InferCreationAttributes<Partnership>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare partnershipId: CreationOptional<string>;

    @Column(DataType.STRING)
    declare businessName: string;

    @Column({ type: DataType.TEXT, allowNull: true })
    declare logo?: CreationOptional<string>;

    @Column(DataType.STRING)
    declare whatsapp: string;

    @Column({ type: DataType.TEXT, allowNull: true })
    declare website?: CreationOptional<string>;

    @Column(DataType.TEXT)
    declare address: string;

    @Column(DataType.TEXT)
    declare description: string;
};
