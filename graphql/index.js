const {  ApolloServer, gql } = require('apollo-server-koa');
const { mergeSchemas } = require('graphql-tools');
const { version } = require('../package');
const { typeDefs: discogsTypeDefs, resolvers: discogsResolvers, DiscogsAPI } = require('./discogs');


const appTypeDefs = gql`
  type Query {
    version: String
  }
`;

const appResolvers = {
  Query: {
    version: () => version,
  },
};


const searchTypeDefs = gql`
  input SearchQuery {
    query: String
    artist: String
    album: String
  }

  type SearchResult {
    discogs(search: SearchQuery): DiscogsSearchResult
  }

  extend type Query {
    search(search: SearchQuery): SearchResult
  }
`;

const searchResolvers = {
  Query: {
    search: (_, { search }, { dataSources }) => {
      return {
        discogs: ({ search: nestedSearch }) => {
	  return dataSources.discogsApi.search(nestedSearch || search);
	}
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs: [appTypeDefs, searchTypeDefs, discogsTypeDefs],
  resolvers: [appResolvers, searchResolvers, discogsResolvers],
  dataSources: () => {
    return {
      discogsApi: new DiscogsAPI(),
    };
  },
});

module.exports = server;
