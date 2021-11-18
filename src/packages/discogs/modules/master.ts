import { gql } from 'apollo-server';
import {
  DiscogsSearchMastersArgs,
  DiscogsSearchResultMaster,
  DiscogsMaster,
  SearchDiscogsMaster,
  DiscogsLookupMastersArgs,
} from '../types';

import { Relation } from '../../base/types';
import { createRelation, log } from '../../base';

import { Context } from '../';

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
    masters(
      search: String
      filter: SearchDiscogsFilter
      pagination: DiscogsPaginationParameters = { page: 1, per_page: 1 }
    ): SearchDiscogsMaster!
  }

  extend type DiscogsRelation {
    masters: SearchDiscogsMaster!
  }

  extend type DiscogsLookup {
    masters(id: Int!): DiscogsMaster
  }
`;

export const resolvers = {
  DiscogsSearch: {
    masters: (
      _parent: unknown,
      { search, filter, pagination }: DiscogsSearchMastersArgs,
      { dataSources: { discogsApi } }: Context
    ): Promise<SearchDiscogsMaster> =>
      discogsApi.searchMasters({
        query: search,
        ...filter,
        ...pagination,
      }),
  },
  DiscogsLookup: {
    masters: (
      _parent: unknown,
      { id }: DiscogsLookupMastersArgs,
      { dataSources: { discogsApi } }: Context
    ): Promise<DiscogsMaster> => discogsApi.lookupMaster(id),
  },
  DiscogsSearchResultMaster: {
    master: (
      { master_id }: DiscogsSearchResultMaster,
      _params: unknown,
      { dataSources: { discogsApi } }: Context
    ): Promise<DiscogsMaster> => discogsApi.lookupMaster(master_id),
    relation: ({
      type,
      year,
      title,
      country,
      genre,
    }: DiscogsSearchResultMaster): Relation =>
      createRelation({
        type,
        title,
        album: title.split(' - ')[1],
        artist: title.split(' - ')[0],
        year: parseInt(year),
        country,
        genre,
      }),
  },
  DiscogsMaster: {
    relation: (_parent: any) => {
      return _parent;
    },
  },
  DiscogsRelation: {
    masters: (
      {
        _relationData: { title, year, artist, album, country, ...rest },
      }: Relation,
      _params: unknown,
      { dataSources: { discogsApi } }: Context
    ): Promise<SearchDiscogsMaster> => {
      console.log('[make search masters]', rest);
      return discogsApi.searchMasters({
        year,
        artist,
        country,
        query: title,
      });
    },
  },
};