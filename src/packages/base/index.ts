import { gql } from 'apollo-server';

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

export type SearchAlbumFilter = any;

export interface SearchAlbumsArguments {
  search: string | null;
  filter: SearchAlbumFilter;
}

export interface SearchAlbums {
  _searchInfo: SearchAlbumsArguments;
}
