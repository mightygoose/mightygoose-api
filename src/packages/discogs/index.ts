import { gql } from 'apollo-server';
import { DiscogsAPI } from './dataSource';
import {
  typeDefs as masterTypeDefs,
  resolvers as masterResolvers,
} from './types/master';

export const typeDefs = gql`
  type DiscogsRelation {
    albums: SearchDiscogsMaster
    artists: String
  }

  extend type AlbumRelation {
    discogs: DiscogsRelation
  }

  extend type MasterRelation {
    discogs: DiscogsRelation
  }

  extend type ReleaseRelation {
    discogs: DiscogsRelation
  }

  type DiscogsSearchPaginationUrls {
    last: String
    next: String
  }

  type DiscogsSearchPagination {
    page: Int
    pages: Int
    per_page: Int
    items: Int
    urls: DiscogsSearchPaginationUrls
  }

  type DiscogsCommunity {
    want: Int
    have: Int
  }
`;

export const resolvers = {
  AlbumRelation: {
    discogs: <T>(parent: T): T => parent,
  },
  MasterRelation: {
    discogs: <T>(parent: T): T => parent,
  },
  ReleaseRelation: {
    discogs: <T>(parent: T): T => parent,
  },
  DiscogsRelation: {
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

export const dataSources = { discogsApi: new DiscogsAPI() };

export default [
  { typeDefs, resolvers },
  { typeDefs: masterTypeDefs, resolvers: masterResolvers },
];
