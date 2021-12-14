import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { MONGO_CONNECTION_STRING, MONGO_DBNAME } from 'src/config/env';
import { MONGOOSE_CONNECTION } from 'src/constants';

@Injectable()
export class MongooseService implements MongooseOptionsFactory {
  async createMongooseOptions(): Promise<MongooseModuleOptions> {
    return {
      connectionName: MONGOOSE_CONNECTION,
      uri: MONGO_CONNECTION_STRING,
      dbName: MONGO_DBNAME,
    };
  }
}
