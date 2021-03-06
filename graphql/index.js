import {ApolloServer, gql} from 'apollo-server-koa';
import {mergeSchemas, makeExecutableSchema} from 'graphql-tools';
import {schema as versionSchema} from './version';
import {init as initSearch} from './search';


const SEARCH_EXTENSIONS = [
  './graphql/search/extensions/discogs',
  './graphql/search/extensions/spotify',
  './graphql/search/extensions/deezer',
  './graphql/search/extensions/itunes',
  './graphql/search/extensions/musicbrainz',
];

export const init = async ({app}) => {
  const [searchSchema, searchDataSources] = await initSearch({ extensions: SEARCH_EXTENSIONS });

  const schema = mergeSchemas({
    schemas: [versionSchema, searchSchema],
  });

  const server = new ApolloServer({
    schema,
    dataSources: () => {
      return {
        ...searchDataSources,
      };
    },
    playground: true,
  });

  server.applyMiddleware({app});

  return server;
};
