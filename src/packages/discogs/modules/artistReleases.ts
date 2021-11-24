import { gql } from 'apollo-server';
import {
  DiscogsArtistRelease,
  DiscogsArtistMaster,
  DiscogsArtistReleases,
  DiscogsSearchResultArtistGetReleasesArgs,
  DiscogsArtist,
  DiscogsSearchResultArtist,
  DiscogsArtistReleaseResult,
  DiscogsArtistShort,
} from '../types';

import { Relation } from '../../base/types';
import { createRelation, log } from '../../base';
import { Context } from '../';

export const typeDefs = gql`
  enum DiscogsArtistReleaseResultTypes {
    master
    release
  }

  interface DiscogsArtistReleaseResult {
    id: ID!
    artist: String!
    resource_url: String!
    role: String!
    thumb: String!
    title: String!
    type: DiscogsArtistReleaseResultTypes!
    year: Int!
    relation: Relation!
  }

  type DiscogsArtistRelease implements DiscogsArtistReleaseResult {
    id: ID!
    artist: String!
    format: String!
    label: String!
    resource_url: String!
    role: String!
    status: String!
    thumb: String!
    title: String!
    type: DiscogsArtistReleaseResultTypes!
    year: Int!
    relation: Relation!
  }

  type DiscogsArtistMaster implements DiscogsArtistReleaseResult {
    id: ID!
    artist: String!
    main_release: Int!
    resource_url: String!
    role: String!
    thumb: String!
    title: String!
    type: DiscogsArtistReleaseResultTypes!
    year: Int!
    relation: Relation!
  }

  input DiscogsArtistGetReleasesSort {
    sort: DiscogsArtistRelesesSort
    sort_order: DiscogsMasterVersionsFilterSortOrder
  }

  type DiscogsArtistReleases {
    pagination: DiscogsSearchPagination!
    releases: [DiscogsArtistReleaseResult!]!
  }

  extend type DiscogsArtist {
    getReleases(
      sort: DiscogsArtistGetReleasesSort
      pagination: DiscogsPaginationParameters = { page: 1, per_page: 5 }
    ): DiscogsArtistReleases!
  }

  extend type DiscogsSearchResultArtist {
    getReleases(
      sort: DiscogsArtistGetReleasesSort
      pagination: DiscogsPaginationParameters = { page: 1, per_page: 5 }
    ): DiscogsArtistReleases!
  }

  extend type DiscogsArtistShort {
    getReleases(
      sort: DiscogsArtistGetReleasesSort
      pagination: DiscogsPaginationParameters = { page: 1, per_page: 5 }
    ): DiscogsArtistReleases!
  }
`;

export const resolvers = {
  DiscogsArtistReleaseResult: {
    __resolveType: ({
      type,
    }: DiscogsArtistReleaseResult):
      | 'DiscogsArtistMaster'
      | 'DiscogsArtistRelease'
      | null => {
      if (type === 'master') {
        return 'DiscogsArtistMaster';
      }
      if (type === 'release') {
        return 'DiscogsArtistRelease';
      }
      return null;
    },
  },
  DiscogsArtist: {
    getReleases: (
      { id }: DiscogsArtist,
      { pagination, sort }: DiscogsSearchResultArtistGetReleasesArgs,
      { dataSources: { discogsApi } }: Context
    ): Promise<DiscogsArtistReleases> =>
      discogsApi.lookupArtistReleases(parseInt(id), { ...sort, ...pagination }),
  },
  DiscogsSearchResultArtist: {
    getReleases: (
      { id }: DiscogsSearchResultArtist,
      { pagination, sort }: DiscogsSearchResultArtistGetReleasesArgs,
      { dataSources: { discogsApi } }: Context
    ): Promise<DiscogsArtistReleases> =>
      discogsApi.lookupArtistReleases(parseInt(id), { ...sort, ...pagination }),
  },
  DiscogsArtistShort: {
    getReleases: (
      { id }: DiscogsArtistShort,
      { pagination, sort }: DiscogsSearchResultArtistGetReleasesArgs,
      { dataSources: { discogsApi } }: Context
    ): Promise<DiscogsArtistReleases> =>
      discogsApi.lookupArtistReleases(parseInt(id), { ...sort, ...pagination }),
  },
  DiscogsArtistRelease: {
    relation: ({
      year,
      title: album,
      artist,
      type,
    }: DiscogsArtistRelease): Relation =>
      createRelation({
        type,
        artist,
        artists: [artist],
        album,
        title: `${artist} - ${album}`,
        year,
      }),
  },
  DiscogsArtistMaster: {
    relation: ({
      year,
      title: album,
      artist,
      type,
    }: DiscogsArtistMaster): Relation =>
      createRelation({
        type,
        artist,
        artists: [artist],
        album,
        title: `${artist} - ${album}`,
        year,
      }),
  },
};

export default { typeDefs, resolvers };
