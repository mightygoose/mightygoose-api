import { gql } from 'apollo-server';
import {
  SearchAlbums,
  SearchAlbumsArguments,
  typeDefs as baseTypeDefs,
} from '../packages/base';

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
      { filter = null, search = null }: SearchAlbumsArguments
    ): SearchAlbums => {
      console.log('search album resolver');
      return {
        _searchInfo: { filter, search },
      };
    },
  },
};

export default { typeDefs, resolvers };
