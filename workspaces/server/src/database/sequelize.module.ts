import { User } from '@/src/modules/user/entity/user.entity';
import { Module, Provider } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { dbConfig } from '@/src/core/configs/database';

export const sequelize = new Sequelize(dbConfig);

const providers: Provider<any>[] = [{
  provide: 'SEQUELIZE',
  useFactory: () => {
    sequelize.addModels([User]);
    // await sequelize.sync();

    return sequelize;
  },
}];

@Module({
  providers,
  exports: providers,
})
export class SequelizeModule {}
