import { gql } from 'apollo-server';

export type SearchAlbumFilter = any;

export interface SearchAlbumsArguments {
  search: string | null;
  filter: SearchAlbumFilter;
}

export interface SearchAlbums {
  _searchInfo: SearchAlbumsArguments;
}

export const typeDefs = gql`
  scalar SearchAlbumFilter

  type SearchInfo {
    search: String
    filter: SearchAlbumFilter
  }

  type SearchAlbums {
    _searchInfo: String
  }

  type Search {
    albums(search: String, filter: SearchAlbumFilter): SearchAlbums
  }

  scalar RelationInfo

  type Relation {
    info: RelationInfo
  }
`;

export const resolvers = {
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
