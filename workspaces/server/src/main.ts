import { resolve } from 'path';
import { from } from 'rxjs';

import { PORT } from '@/src/core/configs/envs';
import { AppModule } from '@/src/app.module';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as session from 'express-session';
import * as passport from 'passport';

from(NestFactory.create<NestExpressApplication>(AppModule)).subscribe((app) => {
  app.enableCors({ origin: [] });
  const publicFolder = resolve(process.cwd(), '..', '..', 'dist', 'public');

  app.useStaticAssets(publicFolder, {
    index: false,
    dotfiles: 'ignore',
  });

  app.use(cookieParser());
  app.use(compression());
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  from(app.listen(PORT)).subscribe(() =>
    console.log(`App running on: http://localhost:${PORT}`),
  );
});
