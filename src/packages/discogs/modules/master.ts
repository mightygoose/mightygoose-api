import { gql } from 'apollo-server';
import {
  DiscogsSearchMastersArgs,
  DiscogsSearchResultMaster,
  DiscogsSearchResultRelease,
  DiscogsMaster,
  DiscogsRelease,
  SearchDiscogsMaster,
  DiscogsLookupMasterArgs,
  DiscogsRelationMastersArgs,
} from '../types';

import { Relation } from '../../base/types';
import { createRelation, log } from '../../base';

import { Context } from '../';

export const typeDefs = gql`
  """
  The Master resource represents a set of similar Releases. Masters (also known as “master releases”) have a “main release” which is often the chronologically earliest
  """
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
    master(id: Int!): DiscogsMaster
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
    master: (
      _parent: unknown,
      { id }: DiscogsLookupMasterArgs,
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
    }: DiscogsSearchResultMaster): Relation => {
      const [artist, album] = title.split(' - ');
      return createRelation({
        type,
        title,
        album,
        artist,
        artists: artist.split(' / '),
        year: parseInt(year),
        country,
        genre,
      });
    },
  },
  DiscogsMaster: {
    relation: ({ year, title, artists }: DiscogsMaster): Relation => {
      const artistsFlatened =
        artists?.reduce<Array<string>>((acc, artist) => {
          if (typeof artist?.name !== 'undefined') {
            return [...acc, artist.name];
          }
          return acc;
        }, []) || [];

      const artist = artistsFlatened.join(' / ');

      return createRelation({
        type: 'master',
        artist,
        artists: artistsFlatened,
        album: title,
        title: `${artist} - ${title}`,
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
