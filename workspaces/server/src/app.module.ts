import { PageModule } from './modules/pages/pages.module';
import { Global, Module } from '@nestjs/common';

import { SequelizeModule } from './database/sequelize.module';
import { ApisModule } from './modules/apis.module';
// import { LoginModule } from './modules/login/login.module';
// import { LoggerService } from './core/providers/logger';

@Global()
@Module({
  imports: [
    /**
     * WARNING: Module should load by below order
     */
    ApisModule,
    // LoginModule,
    PageModule,
    SequelizeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
