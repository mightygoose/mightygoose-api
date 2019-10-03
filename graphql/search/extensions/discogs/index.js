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
} from 'graphql';


export { dataSources } from './dataSources';

export const DiscogsConnection = new GraphQLObjectType({
  name: 'DiscogsConnection',
  fields: {},
});

export const Connection = DiscogsConnection;

export const DiscogsRelease = new GraphQLObjectType({
  name: 'DiscogsRelease',
  fields: {
    barcode: {type: GraphQLList(GraphQLString)},
    catno: {type: GraphQLString},
    community: {
      type: new GraphQLObjectType({
        name: 'DiscogsCommunityInfo',
        fields: {
          have: {type: GraphQLInt},
          want: {type: GraphQLInt},
        },
      }),
    },
    country: {type: GraphQLString},
    cover_image: {type: GraphQLString},
    format: {type: GraphQLList(GraphQLString)},
    format_quantity: {type: GraphQLInt},
    formats: {
      type: GraphQLList(
        new GraphQLObjectType({
          name: 'DiscogsFormats',
          fields: {
            descriptions: {type: GraphQLList(GraphQLString)},
            name: {type: GraphQLString},
            qty: {type: GraphQLString},
          },
        }),
      ),
    },
    genre: {type: GraphQLList(GraphQLString)},
    id: {type: GraphQLInt},
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
      type: new GraphQLObjectType({
        name: 'DiscogsUserData',
        fields: {
          in_collection: {type: GraphQLBoolean},
          in_wantlist: {type: GraphQLBoolean},
        },
      }),
    },
    year: {type: GraphQLString},
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

export const DiscogsSearchResult = new GraphQLObjectType({
  name: 'DiscogsSearchResult',
  fields: {
    releases: {
      type: DiscogsReleasesSearchResult,
      async resolve(args, _, {dataSources}) {
        return dataSources.discogsApi.searchRelease(args);
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
export const SearchResult = DiscogsSearchResult;
export const SearchResultName = 'DiscogsSearchResult';
export const ConnectionName = 'DiscogsConnection';
