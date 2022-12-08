import { config } from 'dotenv';

config();

const {
  PORT = 3000,
  MYSQL__DATABASE = '',
  MYSQL__HOST = 'localhost',
  MYSQL__PORT = 3306,
  MYSQL__USER = '',
  MYSQL__PASSWORD = '',
  NODE_ENV = 'development',
  GCP__SQL_SOCKET_PATH = '',
  GCP__SQL_CONNECTION_NAME = '',
  JWT__PRIVATE_KEY: JWT__PRIVATE_KEY_STR = '',
  JWT__PUBLIC_KEY: JWT__PUBLIC_KEY_STR = '',
  API_PREFIX = '/api/v1',
} = process.env;

const JWT__PRIVATE_KEY = Buffer.from(JWT__PRIVATE_KEY_STR, 'base64');
const JWT__PUBLIC_KEY = Buffer.from(JWT__PUBLIC_KEY_STR, 'base64');

export {
  PORT,
  MYSQL__DATABASE,
  MYSQL__HOST,
  MYSQL__PORT,
  MYSQL__USER,
  MYSQL__PASSWORD,
  NODE_ENV,
  GCP__SQL_SOCKET_PATH,
  GCP__SQL_CONNECTION_NAME,
  JWT__PRIVATE_KEY,
  JWT__PUBLIC_KEY,
  API_PREFIX,
};
