import { gql } from 'apollo-server';
import { SearchAlbums } from '../base';

export const typeDefs = gql`
  scalar SpotifySearchAlbumsInfo

  type SpotifyAlbumRelation {
    albums: SearchSpotifyAlbum
    artists: String
  }

  extend type AlbumRelation {
    spotify: SpotifyAlbumRelation
  }

  type SpotifyAlbum {
    id: ID
    title: String
    relation: AlbumRelation
  }

  type SearchSpotifyAlbum {
    info: SpotifySearchAlbumsInfo
    results: [SpotifyAlbum]
  }

  extend type SearchAlbums {
    spotify(search: String, filter: SearchAlbumFilter): SearchSpotifyAlbum
  }
`;

export const resolvers = {
  SearchAlbums: {
    spotify: (
      parent: SearchAlbums,
      { search, filter }: { search: string; filter: any }
    ) => {
      console.log(
        'spotify search resolver',
        search,
        filter,
        parent._searchInfo
      );
      return {
        info: null,
        results: [
          { id: 1, title: 'test' },
          { foo: 234, id: 2 },
        ],
      };
    },
  },
  SpotifyAlbum: {
    relation: (_parent: any) => {
      return {
        id: _parent.id,
        unifiedTitle: _parent.title || 'unknown title',
      };
    },
  },
  AlbumRelation: {
    spotify: <T>(parent: T): T => parent,
  },
  SpotifyAlbumRelation: {
    albums: (_parent: any) => {
      console.log(_parent);
      return {
        info: null,
        results: [
          {
            id: 6,
            title: `album related to ${_parent.id} : ${_parent.unifiedTitle}`,
          },
        ],
      };
    },
  },
};

export default { typeDefs, resolvers };
