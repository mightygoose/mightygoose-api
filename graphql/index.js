import {ApolloServer, gql} from 'apollo-server-koa';
import {mergeSchemas, makeExecutableSchema} from 'graphql-tools';
import {DiscogsAPI} from './discogs';
import {schema as versionSchema} from './version';
import {schema as searchSchema} from './search';

const schema = mergeSchemas({
  schemas: [versionSchema, searchSchema],
});

const server = new ApolloServer({
  schema,
  dataSources: () => {
    return {
      discogsApi: new DiscogsAPI(),
    };
  },
});

module.exports = server;
