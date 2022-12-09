import { QueryInterface } from 'sequelize';
import { MODEL_NAME } from '../../src/utils/contants';

('use strict');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      CREATE TABLE users (
        user_id INT(11) NOT NULL AUTO_INCREMENT,
        user_name VARCHAR(100) NOT NULL,
        mail_address VARCHAR(100) NOT NULL,
        user_password VARCHAR(255) NOT NULL,
        delete_flg TINYINT(4) NULL DEFAULT '0',
        authority TINYINT(4) NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        created_by INT(11) NULL DEFAULT '0',
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        updated_by INT(11) NULL DEFAULT '0',
        PRIMARY KEY (user_id),
        UNIQUE INDEX mail_address_UNIQUE (mail_address ASC))
      ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(MODEL_NAME.USER);
  },
};
