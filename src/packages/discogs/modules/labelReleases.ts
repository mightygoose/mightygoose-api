import { gql } from 'apollo-server';
import {
  DiscogsLabel,
  DiscogsSearchResultLabelGetReleasesArgs,
  DiscogsLabelReleases,
  DiscogsSearchResultLabel,
  DiscogsLabelReleaseResult,
  DiscogsRelease,
  DiscogsLabelReleaseResultReleaseArgs,
  Resolvers,
} from '../types';

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
    status: String!
    format: String!
    catno: String!
    thumb: String!
    resource_url: String!
    title: String!
    year: Int!
    artist: String!
    release(curr_abbr: DiscogsCurrencies): DiscogsRelease!
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

export const resolvers: Resolvers<Context> = {
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
  DiscogsLabelReleaseResult: {
    release: (
      { id }: DiscogsLabelReleaseResult,
      { curr_abbr }: DiscogsLabelReleaseResultReleaseArgs,
      { dataSources: { discogsApi } }: Context
    ): Promise<DiscogsRelease> =>
      discogsApi.lookupRelease(parseInt(id), curr_abbr),
  },
};

export default { typeDefs, resolvers };
