import { gql } from 'apollo-server';
import {
  DiscogsSearchMastersArgs,
  DiscogsSearchResultMaster,
  DiscogsSearchResultRelease,
  DiscogsMaster,
  DiscogsRelease,
  SearchDiscogsMaster,
  DiscogsLookupMastersArgs,
  DiscogsRelationMastersArgs,
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

  extend type DiscogsSearchResultRelease {
    master: DiscogsMaster!
  }

  extend type DiscogsRelease {
    master: DiscogsMaster!
  }

  extend type DiscogsSearch {
    masters(
      search: String
      filter: SearchDiscogsFilter
      pagination: DiscogsPaginationParameters = { page: 1, per_page: 1 }
    ): SearchDiscogsMaster!
  }

  extend type DiscogsRelation {
    masters(
      pagination: DiscogsPaginationParameters = { page: 1, per_page: 1 }
    ): SearchDiscogsMaster!
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
        //artists: []
        year: parseInt(year),
        country,
        genre,
      }),
  },
  DiscogsMaster: {
    relation: ({ year, title, artists }: DiscogsMaster): Relation => {
      const artist = artists
        ?.map((artist) => (artist ? artist.name : ''))
        .join(' & ');
      const album = title;

      return createRelation({
        type: 'master',
        artist,
        //artists: []
        album,
        title: `${artist} - ${album}`,
        year,
      });
    },
  },
  DiscogsRelation: {
    masters: (
      {
        _relationData: { title, year, artist, album, country, ...rest },
      }: Relation,
      { pagination }: DiscogsRelationMastersArgs,
      { dataSources: { discogsApi } }: Context
    ): Promise<SearchDiscogsMaster> => {
      console.log(
        '[make search masters]',
        title,
        year,
        artist,
        album,
        country,
        rest
      );
      return discogsApi.searchMasters({
        year,
        artist,
        country,
        query: title,
        ...pagination,
      });
    },
  },
  DiscogsSearchResultRelease: {
    master: (
      { master_id }: DiscogsSearchResultRelease,
      _params: unknown,
      { dataSources: { discogsApi } }: Context
    ): Promise<DiscogsMaster> => discogsApi.lookupMaster(master_id),
  },
  DiscogsRelease: {
    master: (
      { master_id }: DiscogsRelease,
      _params: unknown,
      { dataSources: { discogsApi } }: Context
    ): Promise<DiscogsMaster> => discogsApi.lookupMaster(master_id),
  },
};
