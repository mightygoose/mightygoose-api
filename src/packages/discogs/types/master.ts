import { gql } from 'apollo-server';
import { BaseContext } from 'apollo-server-types';
import { SearchAlbums } from '../../base';

export const typeDefs = gql`
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
    discogs: (
      parent: SearchAlbums,
      params: { search: string; filter: any },
      { dataSources: { discogsApi } }: BaseContext
    ) => {
      console.log('discogs search resolver');
      const mergedParams = {
        ...parent._searchInfo,
        ...params,
      };
      return discogsApi.searchMasters({
        query: mergedParams.search,
        page: 1,
        per_page: 1,
      });
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
};
