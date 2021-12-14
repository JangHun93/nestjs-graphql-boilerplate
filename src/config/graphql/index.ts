import { join } from 'path';
import * as depthLimit from 'graphql-depth-limit';
import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { CustomScalars } from 'src/common/scalar';
import { GRAPHQL_ENDPOINT, TOKEN_KEY } from 'src/constants';

/**
 * GraphQL 모듈 설정
 * @description introspection - 개발 모드에서 GraphQL Schema를 Query할 수 있도록 설정 [[참조](https://graphql.org/learn/introspection/)]
 * @description validationRules - [graphql-depth-limit](https://www.npmjs.com/package/graphql-depth-limit) 라이브러리를 이용해서 특정 depth까지만 접근 가능하도록 제한
 * @description context - GraphQL Context로 HTTP Request Header에 있는 'x-jwt' 토큰을 전달하기 위함 [[참조](https://www.apollographql.com/docs/apollo-server/data/resolvers/#the-context-argument)]
 */
@Injectable()
export class GraphqlService implements GqlOptionsFactory {
  async createGqlOptions(): Promise<GqlModuleOptions> {
    const directiveResolvers = {
      isAuthenticated: (next, source, args, ctx) => {
        const { currentUser } = ctx;

        if (!currentUser) {
          throw new Error('You are not authenticated!');
        }

        return next();
      },
      hasRole: (next, source, args, ctx) => {
        const { role } = args;
        const { currentUser } = ctx;

        if (!currentUser) {
          throw new Error('You are not authenticated!');
        }

        if (role !== currentUser.role) {
          throw new Error(
            `Must have role: ${role}, you have role: ${currentUser.role}`,
          );
        }
        return next();
      },
    };
    return {
      path: GRAPHQL_ENDPOINT,
      typePaths: ['./src/**/*.(gql|graphql)'],
      definitions: {
        path: join(process.cwd(), 'src/types/graphql.schema.ts'),
        defaultScalarType: 'Date',
        outputAs: 'class',
        enumsAsTypes: false,
      },
      resolvers: {
        ...CustomScalars,
      },
      validationRules: [depthLimit(10)],
      context: ({ req, connection }) => ({
        token: req ? req.headers[TOKEN_KEY] : connection.context[TOKEN_KEY],
      }),
      directiveResolvers,
    };
  }
}
