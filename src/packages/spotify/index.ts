import { gql } from 'apollo-server';
import { SearchAlbums, SearchAlbumsArguments } from '../base';

export const typeDefs = gql`
  scalar SearchAlbumsInfo

  type SpotifyRelation {
    albums: SearchSpotifyAlbum
    artists: String
  }

  extend type Relation {
    spotify: SpotifyRelation
  }

  type SpotifyAlbum {
    id: ID
    title: String
    relation: Relation
  }

  type SearchSpotifyAlbum {
    info: SearchAlbumsInfo
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
  Relation: {
    spotify: (_parent: any) => {
      return _parent;
    },
  },
  SpotifyRelation: {
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
