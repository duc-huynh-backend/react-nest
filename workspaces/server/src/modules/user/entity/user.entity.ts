import { DELETE_FLG } from './../../../utils/contants';
import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

import { MODEL_NAME } from '@/src/utils/contants';
import { BaseEntity } from '@/src/core/entity/base.entity';
import { ID } from '@/src/core/types/common';

// export interface IUser extends IBaseEntity {
//   user_id: number;
//   user_name: string;
//   mail_address: string;
//   user_password: string;
//   authority: number;
// }

@Table({
  freezeTableName: true,
  tableName: MODEL_NAME.USER,
  defaultScope: { where: { delete_flg: DELETE_FLG.NO } },

})
export class User extends BaseEntity {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
    user_id: ID;

  @AllowNull(false)
  @Column(DataType.STRING(100))
    user_name: string;

  @Unique
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING(100))
    mail_address: string;

  @AllowNull(false)
  @Column(DataType.STRING)
    user_password: string;

  @AllowNull(false)
  @Column(DataType.TINYINT)
    authority: number;
}
