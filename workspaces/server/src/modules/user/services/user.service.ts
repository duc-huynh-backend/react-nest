import { LoggerService } from './../../../core/providers/logger';
import { Op } from 'sequelize';
import { DEFAULT_AUTHORITY, DEFAULT_OFFSET } from './../../../utils/contants';
import { SearchDTO } from './../dto/search.dto';
import { isEmpty } from 'lodash';
import { User } from '@/src/modules/user/entity/user.entity';
import { UsersRepository } from './../repository/user.repository';
import { BaseService } from '@/src/core/services/common.service';
import {
  BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException,
} from '@nestjs/common';
import { IFindUserPayload } from '../types/user';
import { JwtService } from '@nestjs/jwt';
import { JWT__PRIVATE_KEY } from '@/src/core/configs/envs';
import { ID } from '@/src/core/types/common';

@Injectable()
export class UserService extends BaseService {
  constructor(
    @Inject(UsersRepository.name)
    private readonly usersRepository: UsersRepository,
    // private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly loggerService: LoggerService,
  ) {
    super();
  }

  async findUsers(criteria: SearchDTO) {
    const {
      user_name, authority = DEFAULT_AUTHORITY, limit, page,
    } = criteria;

    const condition = {
      where: {
        user_name: { [Op.substring]: user_name.trim() },
        authority: Number(authority),
      },
      pagination: {
        limit: Number(limit),
        offset: (page ? Number(page) - 1 : DEFAULT_OFFSET) * Number(limit),
      },
    };

    try {
      const { count, rows }: { count: number, rows: User[] } =
      await this.usersRepository.findAndCountAll(condition.where, condition.pagination);

      return { count, rows };
    } catch (error) {
      console.log('======== user.service findUsers', error);
      throw new InternalServerErrorException();
    }
  }

  async findUserById(id: string) {
    if (!id) throw new BadRequestException();

    const user: Partial<User> = {};

    try {
      const res = await this.usersRepository.findOne({ user_id: Number(id) });
      Object.assign(user, res);
    } catch (error) {
      console.log('======== user.service findUserById', error);
      throw new InternalServerErrorException();
    }

    if (isEmpty(user)) throw new NotFoundException();

    return user;
  }

  async findUserByEmail(email: string) {
    if (!email) {
      throw new BadRequestException();
    }
    const user = await this.usersRepository.findOne({ mail_address: email });

    return user;
  }

  async findById(id: ID) {
    return await this.usersRepository.findById(id);
  }

  async updateUserById(id: ID, payload: IFindUserPayload, currentUserId: ID) {
    const user = await this.usersRepository.findById(id);

    if (isEmpty(user)) {
      this.loggerService.error('User not found');
      throw new BadRequestException();
    }

    try {
      const isUpdated = await this.usersRepository.update({ [this.usersRepository.idField]: id }, {
        ...payload,
        updated_by: currentUserId,
      });
      return isUpdated;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  async createUser(payload: Partial<User>, currentUserId: ID) {
    try {
      return await this.usersRepository.create({
        ...payload,
        created_by: currentUserId,
        updated_by: currentUserId,
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async deleteUserById(id: number) {
    return await this.usersRepository.delete(id);
  }

  async getAccessToken(email: string, password: string) {
    const user = await this.findUserByEmail(email);

    if (isEmpty(user)) {
      throw new BadRequestException();
    }

    if (user.user_password !== password) {
      throw new BadRequestException();
    }

    const token = this.jwtService.sign({ id: user.user_id }, { privateKey: JWT__PRIVATE_KEY });

    return token;
  }
}
