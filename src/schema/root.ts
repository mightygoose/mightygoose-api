import { gql } from 'apollo-server';

export const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  type SearchAlbums {
    searchInfo: String
  }

  type Search {
    albums: SearchAlbums
  }

  type Query {
    search: Search
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
export const resolvers = {
  Query: {
    search: () => ({}),
  },
  Search: {
    albums: () => {
      console.log('search album resolver');
      return {};
    },
  },
};

export default { typeDefs, resolvers };
