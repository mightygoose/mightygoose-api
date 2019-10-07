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

import {SearchItemInterface} from '../../interfaces';

export {dataSources} from './dataSources';

const MusicbrainzConnection = new GraphQLObjectType({
  name: 'MusicbrainzConnection',
  fields: {
    connectionsCount: {type: GraphQLInt},
  },
});

const MusicbrainzPagination = new GraphQLObjectType({
  name: 'MusicbrainzPagination',
  fields: {
    count: {type: GraphQLInt},
    offset: {type: GraphQLInt},
    total: {type: GraphQLInt},
    created: {type: GraphQLString},
  },
});

const MusicbrainzArtistSimplified = new GraphQLObjectType({
  name: 'MusicbrainzArtistSimplified',
  fields: {
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    sortName: {type: GraphQLString},
  },
});

const MusicbrainzArtistCredit = new GraphQLObjectType({
  name: 'MusicbrainzArtistCredit',
  fields: {
    artist: {
      type: MusicbrainzArtistSimplified,
      resolve({ artist }) {
        return {
          ...artist,
          sortName: artist['sort-name'],
        };
      },
    },
    name: {type: GraphQLString},
  },
});

const MusicbrainzMedia = new GraphQLObjectType({
  name: 'MusicbrainzMedia',
  fields: {
    discCount: {type: GraphQLInt},
    trackCount: {type: GraphQLInt},
    format: {type: GraphQLString},
  },
});

const MusicbrainzArea = new GraphQLObjectType({
  name: 'MusicbrainzArea',
  fields: {
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    iso3166_1Codes: {type: GraphQLList(GraphQLString)},
    sortName: {type: GraphQLString},
  },
});

const MusicbrainzReleaseEvent = new GraphQLObjectType({
  name: 'MusicbrainzReleaseEvent',
  fields: {
    area: {
      type: MusicbrainzArea,
      resolve({ area }) {
        return {
          ...area,
          iso3166_1Codes: area['iso-3166-1-codes'],
          sortName: area['sort-name'],
        };
      },
    },
    date: {type: GraphQLString},
  },
});

const MusicbrainzReleaseGroupSimplified = new GraphQLObjectType({
  name: 'MusicbrainzReleaseGroupSimplified',
  fields: {
    id: {type: GraphQLID},
    primaryType: {type: GraphQLString},
    title: {type: GraphQLString},
    typeId: {type: GraphQLID},
  },
});

const MusicbrainzTextRepresentation = new GraphQLObjectType({
  name: 'MusicbrainzTextRepresentation',
  fields: {
    language: {type: GraphQLString},
    script: {type: GraphQLString},
  },
});

const MusicbrainzLabelSimplified = new GraphQLObjectType({
  name: 'MusicbrainzLabelSimplified',
  fields: {
    id: {type: GraphQLID},
    name: {type: GraphQLString},
  },
});

const MusicbrainzLabelInfo = new GraphQLObjectType({
  name: 'MusicbrainzLabelInfo',
  fields: {
    catalogNumber: {type: GraphQLString},
    label: {type: MusicbrainzLabelSimplified},
  },
});

const MusicbrainzRelease = new GraphQLObjectType({
  name: 'MusicbrainzRelease',
  interfaces: [SearchItemInterface],
  fields: {
    id: {type: GraphQLID},
    title: {type: GraphQLString},
    type: {type: GraphQLString},
    count: {type: GraphQLInt},
    country: {type: GraphQLString},
    date: {type: GraphQLString},
    score: {type: GraphQLInt},
    status: {type: GraphQLString},
    trackCount: {type: GraphQLInt},
    year: {type: GraphQLInt},
    packaging: {type: GraphQLString},
    labelInfo: {
      type: GraphQLList(MusicbrainzLabelInfo),
      resolve({labelInfo}) {
        if(!labelInfo){
          return null;
        }
        return labelInfo.map(item => {
          return {
            ...item,
            catalogNumber: item['catalog-number'],
          };
        });
      },
    },
    artistCredit: {type: GraphQLList(MusicbrainzArtistCredit)},
    media: {
      type: GraphQLList(MusicbrainzMedia),
      resolve({media}) {
        return media.map(item => {
          return {
            ...item,
            discCount: item['disc-count'],
            trackCount: item['track-count'],
          };
        });
      },
    },
    releaseEvents: {type: GraphQLList(MusicbrainzReleaseEvent)},
    releaseGroup: {
      type: MusicbrainzReleaseGroupSimplified,
      resolve({releaseGroup}) {
        return {
          ...releaseGroup,

          typeId: releaseGroup['type-id'],
          primaryType: releaseGroup['primary-type'],
        };
      },
    },
    textRepresentation: {type: MusicbrainzTextRepresentation},
    connection: {
      type: MusicbrainzConnection,
      resolve(args) {
        return args;
      },
    },
  },
});

const MusicbrainzReleasesSearchResult = new GraphQLObjectType({
  name: 'MusicbrainzReleasesSearchResult',
  fields: {
    pagination: {
      type: MusicbrainzPagination,
      resolve({pagination}) {
        return {
          ...pagination,
          total: pagination.count,
        };
      },
    },
    results: {
      type: GraphQLList(MusicbrainzRelease),
      resolve({results}) {
        return results.map(item => {
          const {title, date} = item;
          const artists = item['artist-credit'].map(({name}) => name);
          return {
            ...item,
            name: title,
            year: new Date(date).getFullYear(),
            title: `${artists.join(', ')} - ${title}`,
            trackCount: item['track-count'],
            artistCredit: item['artist-credit'],
            releaseEvents: item['release-events'],
            releaseGroup: item['release-group'],
            textRepresentation: item['text-representation'],
            labelInfo: item['label-info'],
            type: 'release',
          };
        });
      },
    },
  },
});

const MusicbrainzSearchResult = new GraphQLObjectType({
  name: 'MusicbrainzSearchResult',
  fields: {
    releases: {
      type: MusicbrainzReleasesSearchResult,
      async resolve(args, _, {dataSources}) {
        const response = await dataSources.musicbrainzApi.searchReleases({
          ...args,
        });
        const {releases, ...pagination} = response;

        return {results: releases, pagination};
      },
    },
  },
});

const MusicbrainzQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    musicbrainz: {
      type: MusicbrainzSearchResult,
    },
  },
});

export const schema = new GraphQLSchema({
  query: MusicbrainzQuery,
});

export const name = 'musicbrainz';
export const SearchResultName = 'MusicbrainzSearchResult';
export const ConnectionName = 'MusicbrainzConnection';
