import {mergeTypeDefs} from '@graphql-tools/merge';
import {loadSchemaSync} from '@graphql-tools/load';
import {GraphQLFileLoader} from '@graphql-tools/graphql-file-loader';

export default mergeTypeDefs([
  loadSchemaSync('./**/*.graphql', {
    loaders: [new GraphQLFileLoader()],
  }),
]);
