import { Column, Model, Table } from 'sequelize-typescript';
@Table({ tableName: 'users' })
export class Users extends Model {
  @Column({ allowNull: false })
  userName: string;

  @Column({ allowNull: false })
  key: string;
}
