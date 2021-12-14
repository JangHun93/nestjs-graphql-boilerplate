import * as dotenv from 'dotenv';
dotenv.config();

// Runtime envrionment
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const SERVER_PORT: number = +process.env.SERVER_PORT || 4000;

// MongoDB
export const MONGO_CONNECTION_STRING =
  process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017';
export const MONGO_DBNAME = process.env.MONGO_DBNAME || 'sample';

// Security
export const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY || 'jwt-private-key';
export const BCRYPT_SALT: number = +process.env.BCRYPT_SALT || 10;
