/* eslint-disable prettier/prettier */
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Views extends Model {
  @Column({allowNull: false})
  ip: string;

  @Column({allowNull: false})
  country: string;
}
