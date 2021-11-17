import { gql } from 'apollo-server';
import { BaseContext } from 'apollo-server-types';
import {
  DiscogsSearchMastersArgs,
  DiscogsSearchResultMaster,
  DiscogsMaster,
  SearchDiscogsMaster,
  RelationData,
} from '../types';

import { dataSources } from '../';

export const typeDefs = gql`
  type DiscogsMaster {
    id: ID!
    main_release: Int!
    most_recent_release: Int!
    resource_url: String!
    uri: String!
    versions_url: String!
    main_release_url: String!
    most_recent_release_url: String!
    num_for_sale: Int!
    lowest_price: Float!
    images: [DiscogsImageShort]!
    genres: [String!]!
    styles: [String!]!
    year: Int!
    tracklist: [DiscogsTrackShort]!
    artists: [DiscogsArtistShort]!
    title: String!
    notes: String!
    data_quality: String!
    videos: [DiscogsVideo]!
    relation: Relation!
  }

  type DiscogsSearchResultMaster {
    id: ID!
    master_id: Int!
    master_url: String!
    country: String!
    year: String!
    format: [String!]!
    label: [String!]!
    type: String!
    genre: [String!]!
    style: [String!]!
    barcode: [String]!
    uri: String!
    catno: String!
    title: String!
    thumb: String!
    cover_image: String!
    resource_url: String!
    community: DiscogsCommunity!
    master: DiscogsMaster!
    relation: Relation!
  }

  type SearchDiscogsMaster {
    pagination: DiscogsSearchPagination!
    results: [DiscogsSearchResultMaster!]!
  }

  extend type DiscogsSearch {
    masters(search: String, filter: SearchDiscogsFilter): SearchDiscogsMaster!
  }

  extend type DiscogsRelation {
    masters: SearchDiscogsMaster!
  }
`;

interface Context extends BaseContext {
  dataSources: typeof dataSources;
}

export const resolvers = {
  DiscogsSearch: {
    masters: (
      _parent: unknown,
      params: DiscogsSearchMastersArgs,
      { dataSources: { discogsApi } }: Context
    ): Promise<SearchDiscogsMaster> => {
      console.log('discogs search resolver');
      return discogsApi.searchMasters({
        query: params.search,
        page: 1,
        per_page: 1,
      });
    },
  },
  DiscogsSearchResultMaster: {
    master: (
      { master_id }: DiscogsSearchResultMaster,
      _params: unknown,
      { dataSources: { discogsApi } }: Context
    ): Promise<DiscogsMaster> => discogsApi.lookupMaster(master_id),
    relation: ({
      title,
      year,
      ...rest
    }: DiscogsSearchResultMaster): RelationData => {
      console.log(555, { title, year, rest });
      return {
        __typename: 'RelationData',
        service: 'Discogs',
      };
    },
  },
  DiscogsMaster: {
    relation: (_parent: any) => {
      return _parent;
    },
  },
  DiscogsRelation: {
    masters: (_parent: any) => {
      console.log('[make search masters]', _parent);
      return { results: [] };
    },
  },
};
