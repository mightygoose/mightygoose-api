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
  DiscogsLabel,
  DiscogsSearchResultLabelGetReleasesArgs,
  DiscogsLabelReleases,
  DiscogsSearchResultLabel,
} from '../types';

import { Relation } from '../../base/types';
import { createRelation, log } from '../../base';
import { Context } from '../';

export const typeDefs = gql`
  enum DiscogsLabelRelesesSort {
    """
    (i.e. year of the release)
    """
    year

    """
    (i.e. title of the release)
    """
    title

    format
  }

  input DiscogsLabelGetReleasesSort {
    sort: DiscogsLabelRelesesSort
    sort_order: DiscogsSortOrder
  }

  type DiscogsLabelReleaseResult {
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

  type DiscogsLabelReleases {
    pagination: DiscogsSearchPagination!
    releases: [DiscogsLabelReleaseResult!]!
  }

  extend type DiscogsLabel {
    getReleases(
      sort: DiscogsLabelGetReleasesSort
      pagination: DiscogsPaginationParameters = { page: 1, per_page: 5 }
    ): DiscogsLabelReleases!
  }

  extend type DiscogsSearchResultLabel {
    getReleases(
      sort: DiscogsLabelGetReleasesSort
      pagination: DiscogsPaginationParameters = { page: 1, per_page: 5 }
    ): DiscogsLabelReleases!
  }
`;

export const resolvers = {
  DiscogsLabel: {
    getReleases: (
      { id }: DiscogsLabel,
      { pagination, sort }: DiscogsSearchResultLabelGetReleasesArgs,
      { dataSources: { discogsApi } }: Context
    ): Promise<DiscogsLabelReleases> =>
      discogsApi.lookupLabelReleases(parseInt(id), { ...sort, ...pagination }),
  },
  DiscogsSearchResultLabel: {
    getReleases: (
      { id }: DiscogsSearchResultLabel,
      { pagination, sort }: DiscogsSearchResultLabelGetReleasesArgs,
      { dataSources: { discogsApi } }: Context
    ): Promise<DiscogsLabelReleases> =>
      discogsApi.lookupLabelReleases(parseInt(id), { ...sort, ...pagination }),
  },
};

export default { typeDefs, resolvers };
