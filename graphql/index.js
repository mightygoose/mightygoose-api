const {  ApolloServer, gql } = require('apollo-server-koa');
const { mergeSchemas } = require('graphql-tools');
const { version } = require('../package');


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
  type DiscogsRelease {
    artist: String
    album: String
  }

  type DiscogsResult {
    releases: [DiscogsRelease]
  }


  input SearchQuery {
    query: String
    artist: String
    album: String
  }

  type SearchResult {
    discogs: DiscogsResult
  }

  extend type Query {
    search(query: SearchQuery): SearchResult
    discogs: DiscogsResult
  }
`;

const searchResolves = {
  Query: {
    search: (_, { query }) => {
      return {
        discogs: {
          releases: []
        }
      }
    },
    discogs: () => {
      return {
        releases: []
      }
    }
  },
};

const server = new ApolloServer({
  typeDefs: [appTypeDefs, searchTypeDefs],
  resolvers: [appResolvers, searchResolves],
});

module.exports = server;
