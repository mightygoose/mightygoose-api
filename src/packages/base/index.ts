import { gql } from 'apollo-server';

export type SearchAlbumFilter = any;
export type SearchMasterFilter = any;

export interface SearchArguments {
  search: string | null;
}

export interface SearchMastersArguments extends SearchArguments {
  filter: SearchMasterFilter;
}

export interface SearchMasters {
  _searchInfo: SearchMastersArguments;
}

export interface SearchAlbumsArguments extends SearchArguments {
  filter: SearchAlbumFilter;
}

export interface SearchAlbums {
  _searchInfo: SearchAlbumsArguments;
}

export const typeDefs = gql`
  scalar SearchAlbumFilter
  scalar SearchMasterFilter
  scalar SearchReleaseFilter

  type SearchInfo {
    search: String
    filter: SearchAlbumFilter
  }

  type SearchAlbums {
    _searchInfo: SearchInfo
  }

  type SearchMasters {
    _searchInfo: SearchInfo
  }

  type SearchReleases {
    _searchInfo: SearchInfo
  }

  type Search {
    albums(search: String, filter: SearchAlbumFilter): SearchAlbums
    masters(search: String, filter: SearchMasterFilter): SearchMasters
    releases(search: String, filter: SearchReleaseFilter): SearchReleases
  }

  scalar RelationInfo

  type AlbumRelation {
    info: RelationInfo
  }

  type MasterRelation {
    info: RelationInfo
  }

  type ReleaseRelation {
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
    masters: (
      _parent: unknown,
      { filter = null, search = null }: SearchMastersArguments
    ): SearchMasters => {
      console.log('search master resolver');
      return {
        _searchInfo: { filter, search },
      };
    },
  },
};

export default { typeDefs, resolvers };
