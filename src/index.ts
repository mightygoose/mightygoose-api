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

const packages = <const>{
  root: {
    url: 'local://root',
    schema: rootSchema,
  },
  base: {
    url: 'local://base',
    schema: baseSchema,
  },
  discogs: {
    url: 'local://discogs',
    schema: discogsSchema,
    dataSources: discogsDataSources,
  },
};

const gateway = new ApolloGateway({
  serviceList: Object.entries(packages).map(([name, { url }]) => ({
    name,
    url,
  })),
  buildService: ({ name, url }) => {
    if (name === 'root') {
      return new LocalGraphQLDataSource(packages[name].schema);
    }
    if (name === 'base') {
      return new LocalGraphQLDataSource(packages[name].schema);
    }
    if (name === 'discogs') {
      return new LocalGraphQLDataSource(packages[name].schema);
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
