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
  GraphQLFloat,
} from 'graphql';

import {SearchItemInterface} from '../../interfaces';

export {dataSources} from './dataSources';

const ItunesConnection = new GraphQLObjectType({
  name: 'ItunesConnection',
  fields: {
    connectionsCount: {type: GraphQLInt},
  },
});

const ItunesPagination = new GraphQLObjectType({
  name: 'ItunesPagination',
  fields: {
    total: {type: GraphQLInt},
  },
});

const ItunesAlbum = new GraphQLObjectType({
  name: 'ItunesAlbum',
  interfaces: [SearchItemInterface],
  fields: {
    id: {type: GraphQLID},
    collectionId: {type: GraphQLID},

    type: {type: GraphQLString},
    collectionType: {type: GraphQLString},

    name: {type: GraphQLString},
    collectionName: {type: GraphQLString},

    year: {type: GraphQLInt},
    releaseDate: {type: GraphQLString},

    artist: {type: GraphQLString},
    artistName: {type: GraphQLString},

    title: {type: GraphQLString},

    amgArtistId: {type: GraphQLID},
    artistId: {type: GraphQLID},
    artistViewUrl: {type: GraphQLString},
    artworkUrl100: {type: GraphQLString},
    artworkUrl60: {type: GraphQLString},
    collectionCensoredName: {type: GraphQLString},
    collectionExplicitness: {type: GraphQLString},
    collectionPrice: { type: GraphQLFloat },
    collectionViewUrl: {type: GraphQLString},
    copyright: {type: GraphQLString},
    country: {type: GraphQLString},
    currency: {type: GraphQLString},
    primaryGenreName: {type: GraphQLString},
    trackCount: {type: GraphQLInt},
    wrapperType: {type: GraphQLString},
    connection: {
      type: ItunesConnection,
      resolve(args) {
        return args;
      },
    },
  },
});

const ItunesAlbumsSearchResult = new GraphQLObjectType({
  name: 'ItunesAlbumsSearchResult',
  fields: {
    pagination: {
      type: ItunesPagination,
      resolve({pagination: {resultCount}}) {
        return {
          total: resultCount,
        };
      },
    },
    results: {
      type: GraphQLList(ItunesAlbum),
      resolve({ results }) {
        return results.map((item) => {
          const {collectionId, collectionType, collectionName, artistName, releaseDate} = item;
          return {
            ...item,
            id: collectionId,
            type: collectionType.toLowerCase(),
            name: collectionName,
            year: new Date(releaseDate).getFullYear(),
            title: `${artistName} - ${collectionName}`,
          };
        });
      },
    },
  },
});

const ItunesSearchResult = new GraphQLObjectType({
  name: 'ItunesSearchResult',
  fields: {
    albums: {
      type: ItunesAlbumsSearchResult,
      async resolve(args, _, {dataSources}) {
        const response = await dataSources.itunesApi.searchAlbums({
          ...args,
        });
        const {results, ...pagination} = response;

        return {results, pagination};
      },
    },
  },
});

const ItunesQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    itunes: {
      type: ItunesSearchResult,
    },
  },
});

export const schema = new GraphQLSchema({
  query: ItunesQuery,
});

export const name = 'itunes';
export const SearchResultName = 'ItunesSearchResult';
export const ConnectionName = 'ItunesConnection';
