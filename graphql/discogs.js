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
} from 'graphql';

const DISCOGS_TOKEN = process.env.DISCOGS_TOKEN;

export const typeDefs = gql`
  type DiscogsSearchResult {
    releases: String
  }
`;

export const resolvers = {};

const DiscogsRelease = new GraphQLObjectType({
  name: 'DiscogsRelease',
  fields: {
    artist: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
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
