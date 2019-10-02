import {gql} from 'apollo-server-koa';
import {RESTDataSource} from 'apollo-datasource-rest';
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

import {getConnectionFor} from './connections';
import {DISCOGS_TOKEN} from '../config';


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
    connection: getConnectionFor({ name: 'discogs' }),
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

export const schema = new GraphQLSchema({
  query: DiscogsSearchResult,
});

export class DiscogsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.discogs.com/database';
  }

  willSendRequest(request) {
    request.params.set('token', DISCOGS_TOKEN);
  }

  search(params) {
    return this.get('search', params);
  }

  searchRelease(params) {
    return this.search({
      type: 'release',
      q: encodeURI(params.query),
    });
  }
}
