import { gql } from 'apollo-server';
import { Search, SearchAlbumsArgs, SearchMastersArgs } from './types';

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
    _searchInfo: SearchInfo!
  }

  type Search {
    albums(search: String, filter: SearchAlbumFilter): SearchAlbums!
    masters(search: String, filter: SearchMasterFilter): SearchMasters!
    releases(search: String, filter: SearchReleaseFilter): SearchReleases!
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
      _searchInfo: SearchAlbumsArgs
    ): Search['albums'] => {
      console.log('search album resolver', _searchInfo);
      return {
        _searchInfo,
      };
    },
    masters: (
      _parent: unknown,
      _searchInfo: SearchMastersArgs
    ): Search['masters'] => {
      console.log('search master resolver', _searchInfo);
      return {
        _searchInfo,
      };
    },
  },
};

export default { typeDefs, resolvers };
