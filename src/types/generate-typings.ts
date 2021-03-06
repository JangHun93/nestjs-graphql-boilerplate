import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  //   typePaths: ['./src/**/*.graphql'],
  //   path: join(process.cwd(), 'src/types/graphql.schema.ts'),
  typePaths: ['./src/**/*.(gql|graphql)'],
  path: join(process.cwd(), 'src/types/graphql.schema.ts'),
  outputAs: 'class',
  watch: true,
  defaultScalarType: 'Date',
  enumsAsTypes: false,
  debug: true,
});
