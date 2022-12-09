import { resolve } from 'path';
import {
  MYSQL__DATABASE,
  MYSQL__HOST,
  MYSQL__PASSWORD,
  MYSQL__PORT,
  MYSQL__USER,
  NODE_ENV,
} from '@/src/core/configs/envs';
import {
  existsSync, mkdirSync, writeFileSync,
} from 'fs';

console.log('#########################################################');
console.log('#\t\tGenerate Database Configure Tool\t#');
console.log('#########################################################');
console.log();

const devEnvs = [
  'development',
  'test',
  'staging',
  'production',
];

console.info(`[Info]: NODE_ENV loaded: ${NODE_ENV}`);
console.log();

if (!devEnvs.includes(NODE_ENV)) {
  console.error(`[Error]: NODE_ENV be accepted: [${devEnvs.join(', ')}]`);
  process.exit(1);
}

const dest = resolve(__dirname, '..', '..', 'cli', 'config', NODE_ENV);

!existsSync(dest) && mkdirSync(dest, { recursive: true });

const to = `${resolve(dest, 'database.json')}`;

const config = {};

devEnvs.forEach((env: string) => {
  if (NODE_ENV === env) {
    config['development'] = {
      username: MYSQL__USER,
      password: MYSQL__PASSWORD,
      database: MYSQL__DATABASE,
      host: MYSQL__HOST,
      port: MYSQL__PORT,
      dialect: 'mysql',
    };
  }
});

console.log(`File: ${to}`);
writeFileSync(to, JSON.stringify(config, null, 2), 'utf-8');
