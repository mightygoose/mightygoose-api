import { mergeSchemas, makeExecutableSchema } from 'graphql-tools';
import {gql} from 'apollo-server-koa';
import {version} from '../package';


const versionTypeDefs = gql`
  type Query {
    version: String
  }
`;

const versionResolvers = {
  Query: {
    version: () => version,
  },
};

export const schema = makeExecutableSchema({
  typeDefs: versionTypeDefs,
  resolvers: versionResolvers,
});
