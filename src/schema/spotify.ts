import { gql } from 'apollo-server';

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
    spotify(q: String, filter: SearchAlbumFilter): SearchSpotifyAlbum
  }
`;

export const resolvers = {
  SearchAlbums: {
    spotify: (
      parent: any,
      { q, filter }: { q: string; filter: any },
      ...args: any[]
    ) => {
      console.log('spotify search resolver', q, filter, parent);
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
