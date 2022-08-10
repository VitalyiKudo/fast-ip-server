/* eslint-disable prettier/prettier */
import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table,  } from 'sequelize-typescript';
import { Users } from 'src/users/schemas/users.schema';
@Table({tableName: 'views'})
export class Views extends Model {
  @ForeignKey(() => Users)
  @Column({
    type: DataType.UUID,
    field: 'users.id',
    defaultValue: '1',
  })
  userId: number

  @Column({allowNull: false})
  ip: string;
  
  @Column({allowNull: false})
  country: string;

  @Column({ allowNull: false })
  key: string

  @CreatedAt
  @Column({allowNull: false})
  createdAt: string

  @BelongsTo(() => Users)
  user: Users
}
