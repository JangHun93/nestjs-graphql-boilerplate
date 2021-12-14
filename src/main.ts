import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as mongoose from 'mongoose';
import { NODE_ENV, SERVER_PORT } from 'src/config/env';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * 개발용 Mongoose 디버거 세팅
   */
  mongoose.set('debug', NODE_ENV === 'development');

  /**
   * [Helmet JS](https://github.com/helmetjs/helmet)
   * @description HTTP 헤더 설정으로 보안 설정용 미들웨어
   * 🚧 기본 설정시 GraphQL Playground 미작동, 개발중에는 미사용
   */
  app.use(helmet());

  /**
   * [Rate Limit](https://github.com/nfriedly/express-rate-limit)
   * @description - 시간에 따른 IP 요청 횟수를 제한하는 미들웨어
   * 🚧 개발중에는 미사용
   */
  // app.use(
  //   rateLimit({
  //     windowMs: 1000 * 60 * 60, // an hour
  //     max: 100, // 한 IP당 windowMs 시간에 100개의 request 제한
  //     message:
  //       '⚠️  Too many request created from this IP, please try again after an hour',
  //   }),
  // );

  await app.listen(SERVER_PORT);
}
bootstrap();
