import { mergeSchemas, makeExecutableSchema } from 'graphql-tools';
import {gql} from 'apollo-server-koa';
import {
  typeDefs as discogsTypeDefs,
  schema as discogsSchema,
} from './discogs';


const searchTypeDefs = gql`
  input SearchQuery {
    query: String
    artist: String
    album: String
  }

  type SearchResult {
    discogs(search: SearchQuery): DiscogsSearchResult
  }

  type Query {
    search(search: SearchQuery): SearchResult
  }
`;

const searchResolvers = {
  Query: {
    search: (_, {search}, {dataSources}) => {
      return {
        discogs: ({search: nestedSearch}) => {
          return dataSources.discogsApi.search({...search, ...nestedSearch});
        },
      };
    },
  },
};

const searchSchema = makeExecutableSchema({
  typeDefs: [discogsTypeDefs, searchTypeDefs],
  resolvers: searchResolvers,
});

export const schema = mergeSchemas({
  schemas: [searchSchema, discogsSchema],
});
