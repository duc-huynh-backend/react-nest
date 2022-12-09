import { ID } from './../../../core/types/common.d';
import { BaseRepository } from '@/src/core/repository/base.repository';
import { PaginationInfo } from '@/src/core/types/pagination';
import { User } from '@/src/modules/user/entity/user.entity';
import { DELETE_FLG } from '@/src/utils/contants';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository extends BaseRepository<User> {
  idField = 'user_id';
  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly user: typeof User,
  ) {
    super();
  }

  public async find(criteria: any, pagination?: PaginationInfo): Promise<Partial<User>[]> {
    return await this.user.findAll({
      where: criteria,
      ...pagination,
    });
  }

  public async findAndCountAll(criteria: any, pagination?: PaginationInfo): Promise<any> {
    return await this.user.findAndCountAll({
      where: criteria,
      ...pagination,
    });
  }

  public async findById(id: ID): Promise<Partial<User>> {
    return await this.user.findOne({ where: { [this.idField]: id } }) as any;
  }

  public async findOne(criteria: Partial<User>): Promise<Partial<User>> {
    return await this.user.findOne({ where: criteria }) as any;
  }

  public async create(data: Partial<User>): Promise<User> {
    return await this.user.create(data, { returning: true });
  }

  public async update(criteria: Partial<User>, data: Partial<User>, options?: any): Promise<boolean> {
    const [results] = await this.user.update(data, {
      where: criteria,
      returning: false,
    });

    return results > 0;
  }

  public async delete(id: number): Promise<boolean> {
    return !!(await this.update({ user_id: id }, { delete_flg: DELETE_FLG.YES }));
  }
}
