import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Views } from 'src/views/schemas/views.schema';
@Table({ tableName: 'users' })
export class Users extends Model {
  @Column({ allowNull: false, unique: true })
  username: string;

  @Column
  password: string;

  @Column({ allowNull: false, unique: true })
  key: string;

  @Column({ unique: true })
  'access_token': string;

  @Column({ unique: true })
  'refresh_token': string;

  @HasMany(() => Views, { foreignKey: 'users.id' })
  views: Views[];
}
