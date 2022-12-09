import {
  ConnectionOptions,
  Options,
  PoolOptions,
  ReplicationOptions,
} from 'sequelize';

import {
  GCP__SQL_CONNECTION_NAME,
  GCP__SQL_SOCKET_PATH,
  MYSQL__DATABASE,
  MYSQL__HOST,
  MYSQL__PASSWORD,
  MYSQL__PORT,
  MYSQL__USER,
  NODE_ENV,
} from './envs';

const gcpSqlSocketPath = GCP__SQL_SOCKET_PATH;
const gcpSqlConnectionName = GCP__SQL_CONNECTION_NAME;

const socketPath =
  gcpSqlSocketPath && gcpSqlConnectionName
    ? `${gcpSqlSocketPath}/${gcpSqlConnectionName}`
    : undefined;

const pool: PoolOptions = {
  acquire: 30000,
  idle: 10000,
  max: 5,
  min: 0,
};

export const authdb: ConnectionOptions = {
  host: MYSQL__HOST,
  password: MYSQL__PASSWORD,
  username: MYSQL__USER,
};

const replication: ReplicationOptions = {
  read: [authdb],
  write: authdb,
};

export const dbConfig: Options = {
  database: MYSQL__DATABASE,
  dialect: 'mysql',
  dialectOptions: { socketPath },
  pool,
  port: Number(MYSQL__PORT || 3306),
  replication,
  timezone: '+00:00',
  query: { raw: true },
};
