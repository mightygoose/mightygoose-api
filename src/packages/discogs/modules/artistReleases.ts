import { gql } from 'apollo-server';
import { Resolvers } from '../types';

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

export const resolvers: Resolvers<Context> = {
  DiscogsArtistReleaseResult: {
    __resolveType: ({
      type,
    }): 'DiscogsArtistMaster' | 'DiscogsArtistRelease' | null => {
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
      { id },
      { pagination, sort },
      { dataSources: { discogsApi } }
    ) =>
      discogsApi.lookupArtistReleases(parseInt(id), { ...sort, ...pagination }),
  },
  DiscogsSearchResultArtist: {
    getReleases: (
      { id },
      { pagination, sort },
      { dataSources: { discogsApi } }
    ) =>
      discogsApi.lookupArtistReleases(parseInt(id), { ...sort, ...pagination }),
  },
  DiscogsArtistShort: {
    getReleases: (
      { id },
      { pagination, sort },
      { dataSources: { discogsApi } }
    ) =>
      discogsApi.lookupArtistReleases(parseInt(id), { ...sort, ...pagination }),
  },
  DiscogsArtistRelease: {
    relation: ({ year, title: album, artist, type }) =>
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
    relation: ({ year, title: album, artist, type }) =>
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
