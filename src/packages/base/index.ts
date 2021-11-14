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
`;

export interface Search {
  search: string | null;
}

export interface SearchAlbums extends Search {
  filter: any | null;
}
