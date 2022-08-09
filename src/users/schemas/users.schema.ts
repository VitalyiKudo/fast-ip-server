import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Views } from 'src/views/schemas/views.schema';
@Table({ tableName: 'users' })
export class Users extends Model {
  @Column({ allowNull: false })
  username: string;

  @Column
  password: string;

  @Column({ allowNull: false })
  key: string;

  @HasMany(() => Views, { foreignKey: 'users.id' })
  views: Views[];
}
