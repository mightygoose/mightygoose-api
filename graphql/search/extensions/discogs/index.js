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
  GraphQLScalarType,
  GraphQLInputObjectType,
  GraphQLNonNull,
} from 'graphql';

import {SearchItemInterface} from '../../interfaces';
import {pickFields} from '../../helpers';
import {createUseFields} from '../../types';

export {dataSources} from './dataSources';
import {SearchParams, Search} from './searchParams';

const DiscogsConnection = new GraphQLObjectType({
  name: 'DiscogsConnection',
  fields: {
    connectionsCount: {type: GraphQLInt},
  },
});

const DiscogsCommunityInfo = new GraphQLObjectType({
  name: 'DiscogsCommunityInfo',
  fields: {
    have: {type: GraphQLInt},
    want: {type: GraphQLInt},
  },
});

const DiscogsUserData = new GraphQLObjectType({
  name: 'DiscogsUserData',
  fields: {
    in_collection: {type: GraphQLBoolean},
    in_wantlist: {type: GraphQLBoolean},
  },
});

const DiscogsFormats = new GraphQLObjectType({
  name: 'DiscogsFormats',
  fields: {
    descriptions: {type: GraphQLList(GraphQLString)},
    name: {type: GraphQLString},
    qty: {type: GraphQLString},
  },
});

const DiscogsRelease = new GraphQLObjectType({
  name: 'DiscogsRelease',
  interfaces: [SearchItemInterface],
  fields: {
    barcode: {type: GraphQLList(GraphQLString)},
    catno: {type: GraphQLString},
    community: {
      type: DiscogsCommunityInfo,
    },
    country: {type: GraphQLString},
    cover_image: {type: GraphQLString},
    format: {type: GraphQLList(GraphQLString)},
    format_quantity: {type: GraphQLInt},
    formats: {
      type: GraphQLList(DiscogsFormats),
    },
    genre: {type: GraphQLList(GraphQLString)},
    id: {type: GraphQLID},
    label: {type: GraphQLList(GraphQLString)},
    master_id: {type: GraphQLInt},
    master_url: {type: GraphQLString},
    resource_url: {type: GraphQLString},
    style: {type: GraphQLList(GraphQLString)},
    thumb: {type: GraphQLString},
    title: {type: GraphQLString},
    type: {type: GraphQLString},
    uri: {type: GraphQLString},
    user_data: {
      type: DiscogsUserData,
    },
    year: {type: GraphQLInt},
    connection: {
      type: DiscogsConnection,
      resolve(args) {
        return args;
      },
    },
  },
});

const DiscogsMaster = new GraphQLObjectType({
  name: 'DiscogsMaster',
  interfaces: [SearchItemInterface],
  fields: {
    barcode: {type: GraphQLList(GraphQLString)},
    catno: {type: GraphQLString},
    community: {
      type: DiscogsCommunityInfo,
    },
    country: {type: GraphQLString},
    cover_image: {type: GraphQLString},
    format: {type: GraphQLList(GraphQLString)},
    genre: {type: GraphQLList(GraphQLString)},
    id: {type: GraphQLID},
    label: {type: GraphQLList(GraphQLString)},
    master_id: {type: GraphQLInt},
    master_url: {type: GraphQLString},
    resource_url: {type: GraphQLString},
    style: {type: GraphQLList(GraphQLString)},
    thumb: {type: GraphQLString},
    title: {type: GraphQLString},
    type: {type: GraphQLString},
    uri: {type: GraphQLString},
    user_data: {
      type: DiscogsUserData,
    },
    year: {type: GraphQLInt},
    connection: {
      type: DiscogsConnection,
      resolve(args) {
        return args;
      },
    },
  },
});

const DiscogsPagination = new GraphQLObjectType({
  name: 'DiscogsPagination',
  fields: {
    items: {type: GraphQLInt},
    page: {type: GraphQLInt},
    pages: {type: GraphQLInt},
    per_page: {type: GraphQLInt},
  },
});

const DiscogsReleasesSearchResult = new GraphQLObjectType({
  name: 'DiscogsReleasesSearchResult',
  fields: {
    pagination: {
      type: DiscogsPagination,
    },
    results: {
      type: GraphQLList(DiscogsRelease),
    },
  },
});

const DiscogsMastersSearchResult = new GraphQLObjectType({
  name: 'DiscogsMastersSearchResult',
  fields: {
    pagination: {
      type: DiscogsPagination,
    },
    results: {
      type: GraphQLList(DiscogsMaster),
    },
  },
});

const UseFields = createUseFields(
  'DiscogsUseFields',
  Object.keys(Search.getFields()),
);

const createSearchParams = (parent, {search, useFields, ...pageParams}) => {
  return {
    ...pickFields(parent, useFields),
    ...search,
    ...pickFields(pageParams, [
      {key: 'per_page', use: 'perPage'},
      {key: 'page'},
    ]),
  };
};

export const DiscogsSearchResult = new GraphQLObjectType({
  name: 'DiscogsSearchResult',
  fields: {
    releases: {
      type: DiscogsReleasesSearchResult,
      args: {
        search: {type: Search},
        useFields: {
          type: GraphQLList(UseFields),
          defaultValue: [{key: 'q', use: 'title'}],
        },
        page: {type: GraphQLInt},
        perPage: {type: GraphQLInt, defaultValue: 1},
      },
      async resolve(parent, args, {dataSources}) {
        const searchParams = createSearchParams(parent, args);
        return dataSources.discogsApi.searchReleases(searchParams);
      },
    },
    masters: {
      type: DiscogsMastersSearchResult,
      args: {
        search: {type: Search},
        useFields: {
          type: GraphQLList(UseFields),
          defaultValue: [{key: 'q', use: 'title'}],
        },
        page: {type: GraphQLInt},
        perPage: {type: GraphQLInt, defaultValue: 1},
      },
      async resolve(parent, args, {dataSources}) {
        const searchParams = createSearchParams(parent, args);
        return dataSources.discogsApi.searchMasters(searchParams);
      },
    },
  },
});

const DiscogsQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    discogs: {
      type: DiscogsSearchResult,
      async resolve(args, _, {dataSources}) {
        return dataSources.discogsApi.searchRelease(args);
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: DiscogsQuery,
});

export const name = 'discogs';
export const SearchResultName = 'DiscogsSearchResult';
export const ConnectionName = 'DiscogsConnection';
