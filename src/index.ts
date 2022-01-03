import { ApolloServer } from 'apollo-server';
import {
  ApolloGateway,
  LocalGraphQLDataSource,
  RemoteGraphQLDataSource,
} from '@apollo/gateway';

import { buildSubgraphSchema } from '@apollo/subgraph';

import rootSchema from './schema';
import baseSchema from './packages/base';
// import spotifySchema from './packages/spotify';
import {
  dataSources as discogsDataSources,
  schema as discogsSchema,
} from './packages/discogs';

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'root', url: 'local://root' },
    { name: 'base', url: 'local://base' },
    { name: 'discogs', url: 'local://discogs' },
  ],
  buildService: ({ name, url }) => {
    if (name === 'root') {
      return new LocalGraphQLDataSource(buildSubgraphSchema(rootSchema));
    }
    if (name === 'base') {
      return new LocalGraphQLDataSource(buildSubgraphSchema(baseSchema));
    }
    if (name === 'discogs') {
      return new LocalGraphQLDataSource(discogsSchema);
    }
    return new RemoteGraphQLDataSource({ url });
  },
});

const server = new ApolloServer({
  gateway,
  dataSources: () => ({
    ...discogsDataSources(),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
