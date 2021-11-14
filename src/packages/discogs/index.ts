import { gql } from 'apollo-server';
import { SearchAlbums } from '../base';

export const typeDefs = gql`
  scalar DiscogsSearchAlbumsInfo

  type DiscogsAlbumRelation {
    albums: SearchDiscogsAlbum
    artists: String
  }

  extend type AlbumRelation {
    discogs: DiscogsAlbumRelation
  }

  type DiscogsAlbum {
    id: ID
    title: String
    relation: AlbumRelation
  }

  type SearchDiscogsAlbum {
    info: DiscogsSearchAlbumsInfo
    results: [DiscogsAlbum]
  }

  extend type SearchAlbums {
    discogs(search: String, filter: SearchAlbumFilter): SearchDiscogsAlbum
  }
`;

export const resolvers = {
  SearchAlbums: {
    discogs: (
      parent: SearchAlbums,
      { search, filter }: { search: string; filter: any }
    ) => {
      console.log(
        'discogs search resolver',
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
  DiscogsAlbum: {
    relation: (_parent: any) => {
      return {
        id: _parent.id,
        unifiedTitle: _parent.title || 'unknown title',
      };
    },
  },
  AlbumRelation: {
    discogs: <T>(parent: T): T => parent,
  },
  DiscogsAlbumRelation: {
    albums: (_parent: any) => {
      console.log(_parent);
      return {
        info: null,
        results: [
          {
            id: 6,
            title: `discogs album related to ${_parent.id} : ${_parent.unifiedTitle}`,
          },
        ],
      };
    },
  },
};

export default { typeDefs, resolvers };
