import { gql } from 'apollo-server';

export const typeDefs = gql`
  input SearchAlbumFilter {
    q: String
  }

  type SearchAlbums {
    searchInfo: String
  }

  scalar RelationInfo

  type Relation {
    info: RelationInfo
  }

  type Search {
    albums(search: String, filter: SearchAlbumFilter): SearchAlbums
  }

  type Query {
    search: Search
  }
`;

export interface Search {
  search: string | null;
}

export interface SearchAlbums extends Search {
  filter: any | null;
}

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
