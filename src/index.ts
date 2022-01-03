import { ApolloServer } from 'apollo-server';
import {
  ApolloGateway,
  LocalGraphQLDataSource,
  RemoteGraphQLDataSource,
} from '@apollo/gateway';

import { GraphQLSchema } from 'graphql';

import rootSchema from './schema';
import baseSchema from './packages/base';
// import spotifySchema from './packages/spotify';
import {
  dataSources as discogsDataSources,
  schema as discogsSchema,
} from './packages/discogs';

type Packages = Record<
  string,
  {
    url: string;
    schema?: GraphQLSchema;
    dataSources?: () => Record<string, unknown>;
  }
>;

const packages: Packages = <const>{
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
  buildService: ({ name }) => {
    const { schema, url } = packages[name];
    const isLocal = /^local:\/\//.test(url);
    if (isLocal && schema) {
      return new LocalGraphQLDataSource(schema);
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
