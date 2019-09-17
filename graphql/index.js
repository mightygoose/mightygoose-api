import {ApolloServer, gql, makeExecutableSchema} from 'apollo-server-koa';
import { mergeSchemas } from 'graphql-tools';
import { version } from '../package';
import { typeDefs as discogsTypeDefs, resolvers as discogsResolvers, DiscogsAPI } from './discogs';


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
	  return dataSources.discogsApi.search({ ...search, ...nestedSearch});
	}
      }
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs: [appTypeDefs, searchTypeDefs, discogsTypeDefs],
  resolvers: [appResolvers, searchResolvers, discogsResolvers],
});

const server = new ApolloServer({
  schema,
  dataSources: () => {
    return {
      discogsApi: new DiscogsAPI(),
    };
  },
});

module.exports = server;
