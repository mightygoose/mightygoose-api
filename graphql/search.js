import {mergeSchemas, makeExecutableSchema} from 'graphql-tools';
import {gql} from 'apollo-server-koa';
import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import {
  schema as discogsSchema,
  DiscogsSearchResult,
} from './discogs';
import {
  SpotifySearchResult,
} from './spotify';

const searchParams = {
  query: { type: GraphQLString },
  artist: { type: GraphQLString },
  album: { type: GraphQLString },
}

const SearchResult = new GraphQLObjectType({
  name: 'SearchResult',
  fields: {
    discogs: {
      type: DiscogsSearchResult,
      args: searchParams,
      resolve(search, nestedSearch) {
        return {...search, ...nestedSearch};
      },
    },
    spotify: {
      type: SpotifySearchResult,
      args: searchParams,
      resolve(search, nestedSearch) {
        return {...search, ...nestedSearch};
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'search',
    fields: {
      search: {
        type: SearchResult,
        args: searchParams,
        resolve(_, args) {
          return args;
        },
      },
    },
  }),
});
