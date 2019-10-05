import {gql} from 'apollo-server-koa';
import {mergeSchemas, makeExecutableSchema} from 'graphql-tools';

import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLID,
} from 'graphql';

import { SearchItemInterface } from '../../interfaces';

export {dataSources} from './dataSources';

const SpotifyConnection = new GraphQLObjectType({
  name: 'SpotifyConnection',
  fields: {},
});

const SpotifyPagination = new GraphQLObjectType({
  name: 'SpotifyPagination',
  fields: {
    href: {type: GraphQLString},
    next: {type: GraphQLString},
    previous: {type: GraphQLString},
    offset: {type: GraphQLInt},
    limit: {type: GraphQLInt},
    total: {type: GraphQLInt},
  },
});

const SpotifyImage = new GraphQLObjectType({
  name: 'SpotifyImage',
  fields: {
    height: {type: GraphQLInt},
    url: {type: GraphQLString},
    width: {type: GraphQLInt},
  },
});

const SpotifyExternalUrls = new GraphQLObjectType({
  name: 'SpotifyExternalUrls',
  fields: {
    spotify: {type: GraphQLString},
  },
});

const SpotifyArtistSimplified = new GraphQLObjectType({
  name: 'SpotifyArtistSimplified',
  fields: {
    external_urls: {type: SpotifyExternalUrls},
    href: {type: GraphQLString},
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    type: {type: GraphQLInt},
    uri: {type: GraphQLInt},
  },
});

const SpotifyAlbum = new GraphQLObjectType({
  name: 'SpotifyAlbum',
  interfaces: [SearchItemInterface],
  fields: {
    album_type: {type: GraphQLString},
    artists: {type: GraphQLList(SpotifyArtistSimplified)},
    available_markets: {type: GraphQLList(GraphQLString)},
    external_urls: {type: SpotifyExternalUrls},
    href: {type: GraphQLString},
    id: {type: GraphQLID},
    images: {type: GraphQLList(SpotifyImage)},
    name: {type: GraphQLString},
    release_date: {type: GraphQLString},
    release_date_precision: {type: GraphQLString},
    total_tracks: {type: GraphQLInt},
    type: {type: GraphQLString},
    uri: {type: GraphQLString},
    connection: {
      type: SpotifyConnection,
      resolve(args) {
        return args;
      },
    },
  },
});

const SpotifyAlbumsSearchResult = new GraphQLObjectType({
  name: 'SpotifyAlbumsSearchResult',
  fields: {
    pagination: {
      type: SpotifyPagination,
    },
    results: {
      type: GraphQLList(SpotifyAlbum),
    },
  },
});

const SpotifySearchResult = new GraphQLObjectType({
  name: 'SpotifySearchResult',
  fields: {
    albums: {
      type: SpotifyAlbumsSearchResult,
      async resolve(args, _, {dataSources}) {
        const {albums} = await dataSources.spotifyApi.searchAlbums({
          ...args,
          query: args.query || args.title || args.name
        });
        const {items: results, ...pagination} = albums;
        return {results, pagination};
      },
    },
  },
});

const SpotifyQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    spotify: {
      type: SpotifySearchResult,
      async resolve(args, _, {dataSources}) {
        const {albums} = await dataSources.spotifyApi.searchAlbums(args);
        const {items: results, ...pagination} = albums;
        return {results, pagination};
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: SpotifyQuery,
});

export const name = 'spotify';
export const SearchResultName = 'SpotifySearchResult';
export const ConnectionName = 'SpotifyConnection';
