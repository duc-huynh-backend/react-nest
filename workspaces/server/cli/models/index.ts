import { Sequelize } from 'sequelize';

import { sequelize } from '@/src/database/sequelize.module';

module.exports = Object.assign({
  sequelize,
  Sequelize,
}, {});
