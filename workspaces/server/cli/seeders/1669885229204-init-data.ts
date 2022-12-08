import { MODEL_NAME } from '@/src/utils/contants';
import { QueryInterface } from 'sequelize';
import { users } from './data/users';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, _Sequelize: any) {
    const res = await Promise.allSettled([queryInterface.bulkInsert(MODEL_NAME.USER, users, {})]);

    console.log(res);
  },

  async down(queryInterface: QueryInterface, _Sequelize: any) {
    const res = await Promise.allSettled([queryInterface.bulkDelete(MODEL_NAME.USER, {}, {})]);

    console.log(res);
    return res;
  },
};
