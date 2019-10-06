import {gql} from 'apollo-server-koa';

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

import {SearchItemInterface} from '../../interfaces';

export {dataSources} from './dataSources';

const DeezerConnection = new GraphQLObjectType({
  name: 'DeezerConnection',
  fields: {
    connectionsCount: {type: GraphQLInt},
  },
});

const DeezerPagination = new GraphQLObjectType({
  name: 'DeezerPagination',
  fields: {
    total: {type: GraphQLInt},
  },
});

const DeezerArtistSimplified = new GraphQLObjectType({
  name: 'DeezerArtistSimplified',
  fields: {
    link: {type: GraphQLString},
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    type: {type: GraphQLString},
    picture: {type: GraphQLString},
    picture_small: {type: GraphQLString},
    picture_medium: {type: GraphQLString},
    picture_big: {type: GraphQLString},
    picture_xl: {type: GraphQLString},
    tracklist: {type: GraphQLString},
  },
});

const DeezerAlbum = new GraphQLObjectType({
  name: 'DeezerAlbum',
  interfaces: [SearchItemInterface],
  fields: {
    id: {type: GraphQLID},
    type: {type: GraphQLString},
    title: { type: GraphQLString, },
    link: {type: GraphQLString},
    cover: {type: GraphQLString},
    cover_small: {type: GraphQLString},
    cover_medium: {type: GraphQLString},
    cover_big: {type: GraphQLString},
    cover_xl: {type: GraphQLString},
    genre_id: {type: GraphQLInt},
    nb_tracks: {type: GraphQLInt},
    record_type: {type: GraphQLString},
    tracklist: {type: GraphQLString},
    explicit_lyrics: { type: GraphQLBoolean },
    artist: {
      type: DeezerArtistSimplified
    },
    connection: {
      type: DeezerConnection,
      resolve(args) {
        return args;
      },
    },
  },
});

const DeezerAlbumsSearchResult = new GraphQLObjectType({
  name: 'DeezerAlbumsSearchResult',
  fields: {
    pagination: {
      type: DeezerPagination,
    },
    results: {
      type: GraphQLList(DeezerAlbum),
    },
  },
});

const DeezerSearchResult = new GraphQLObjectType({
  name: 'DeezerSearchResult',
  fields: {
    albums: {
      type: DeezerAlbumsSearchResult,
      async resolve(args, _, {dataSources}) {
        const response = await dataSources.deezerApi.searchAlbums({
          ...args,
        });
        const {data, ...pagination} = response;

        const results = data.map(item => {
          return {
            ...item,
            name: item.title,
            title: `${item.artist.name} - ${item.title}`,
          };
        });

        return {results, pagination};
      },
    },
  },
});

const DeezerQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    deezer: {
      type: DeezerSearchResult,
    },
  },
});

export const schema = new GraphQLSchema({
  query: DeezerQuery,
});

export const name = 'deezer';
export const SearchResultName = 'DeezerSearchResult';
export const ConnectionName = 'DeezerConnection';
