import { DELETE_FLG } from '@/src/utils/contants';
import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  Default,
  Model,
  UpdatedAt,
  Sequelize,
} from 'sequelize-typescript';

export class BaseEntity extends Model {
  @AllowNull(false)
  @Default(DELETE_FLG.NO)
  @Column(DataType.TINYINT)
    delete_flg?: DELETE_FLG;

  @AllowNull(false)
  @CreatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: () => new Date(),
  })
    created_at?: Date;

  @AllowNull(false)
  @Default(0)
  @Column(DataType.INTEGER)
    created_by?: number;

  @AllowNull(false)
  @UpdatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: () => new Date(),
  })
    updated_at?: Date;

  @AllowNull(false)
  @Default(0)
  @Column(DataType.INTEGER)
    updated_by?: number;
}
