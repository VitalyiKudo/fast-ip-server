/* eslint-disable prettier/prettier */
import { Column, Model, Table,  } from 'sequelize-typescript';
@Table({tableName: 'views'})
export class Views extends Model {
  @Column({allowNull: false})
  ip: string;
  
  @Column({allowNull: false})
  country: string;

  @Column({ allowNull: false })
  key: string;
}
