import { gql } from 'apollo-server';
import { SearchAlbums, typeDefs as baseTypeDefs } from '../packages/base';

export const typeDefs = gql`
  ${baseTypeDefs}

  type Query {
    search: Search
  }
`;

export const resolvers = {
  Query: {
    search: () => ({}),
  },
  Search: {
    albums: (
      _parent: unknown,
      { filter = null, search = null }: SearchAlbums
    ): SearchAlbums => {
      console.log('search album resolver');
      return { filter, search };
    },
  },
};

export default { typeDefs, resolvers };
