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

export const log = (message: string, fn: (...args: any[]) => {}) => {
  return (...args: any[]) => {
    console.log(message);
    return fn(...args);
  };
};

export const resolvers = {
  Search: {
    albums: log(
      'search album resolver',
      (_parent: unknown, _searchInfo: SearchAlbumsArgs): Search['albums'] => ({
        _searchInfo,
      })
    ),
    masters: log(
      'search masters resolver',
      (
        _parent: unknown,
        _searchInfo: SearchMastersArgs
      ): Search['masters'] => ({ _searchInfo })
    ),
  },
};

export default { typeDefs, resolvers };
