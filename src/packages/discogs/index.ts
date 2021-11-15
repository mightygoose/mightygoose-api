import { gql } from 'apollo-server';
import { BaseContext } from 'apollo-server-types';
import { SearchAlbums } from '../base';
import { DiscogsAPI } from './dataSource';

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

  type DiscogsSearchResultMaster {
    id: ID
    country: String
    year: String
    format: [String]
    label: [String]
    type: String
    genre: [String]
    style: [String]
    barcode: [String]
    master_id: Int
    master_url: String
    uri: String
    catno: String
    title: String
    thumb: String
    cover_image: String
    resource_url: String
    community: DiscogsCommunity
    #master: DiscogsMaster
    relation: MasterRelation
  }

  type SearchDiscogsMaster {
    pagination: DiscogsSearchPagination
    results: [DiscogsSearchResultMaster]
  }

  extend type SearchMasters {
    discogs(search: String, filter: SearchMasterFilter): SearchDiscogsMaster
  }
`;

export const resolvers = {
  SearchMasters: {
    discogs: async (
      parent: SearchAlbums,
      { search, filter }: { search: string; filter: any },
      { dataSources: { discogsApi } }: BaseContext
    ) => {
      console.log(
        'discogs search resolver',
        search,
        filter,
        parent._searchInfo
      );

      const foo = await discogsApi.searchMasters({
        query: search,
        page: 1,
        per_page: 1,
      });

      console.log(JSON.stringify(foo, null, 2));
      return foo;
    },
  },
  DiscogsSearchResultMaster: {
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

export default { typeDefs, resolvers };
