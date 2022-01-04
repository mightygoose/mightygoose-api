import type { DataSource } from 'apollo-datasource';
import type { GraphQLSchema } from 'graphql';
import { ApolloServer } from 'apollo-server';
import {
  ApolloGateway,
  LocalGraphQLDataSource,
  RemoteGraphQLDataSource,
} from '@apollo/gateway';

import rootSchema from './schema';
import baseSchema from './packages/base';
import {
  dataSources as spotifyDataSources,
  schema as spotifySchema,
} from './packages/spotify';
import {
  dataSources as discogsDataSources,
  schema as discogsSchema,
} from './packages/discogs';

type DataSources = () => Record<string, DataSource>;

type Packages = Record<
  string,
  {
    url: string;
    schema?: GraphQLSchema;
    dataSources?: DataSources;
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
  spotify: {
    url: 'local://spotify',
    schema: spotifySchema,
    dataSources: spotifyDataSources,
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

const dataSources = Object.values(packages).reduce<Array<DataSources>>(
  (acc, { dataSources }) => {
    if (dataSources) {
      return [...acc, dataSources];
    }
    return acc;
  },
  []
);

const server = new ApolloServer({
  gateway,
  dataSources: () =>
    dataSources.reduce<ReturnType<DataSources>>((acc, dataSources) => {
      return { ...acc, ...dataSources() };
    }, {}),
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
