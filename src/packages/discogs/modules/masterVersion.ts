import { gql } from 'apollo-server';
import {
  DiscogsSearchResultMaster,
  DiscogsMaster,
  GetDiscogsMasterVersions,
  DiscogsSearchResultMasterGetVersionsArgs,
} from '../types';

import { Relation } from '../../base/types';
import { createRelation, log } from '../../base';

import { Context } from '../';

export const typeDefs = gql`
  enum DiscogsMasterVersionsFilterSort {
    released
    title
    format
    label
    catno
    country
  }

  enum DiscogsMasterVersionsFilterSortOrder {
    asc
    desc
  }

  input DiscogsMasterVersionsFilterInput {
    """
    The format to filter

    Example: Vinyl
    """
    format: String

    """
    The format to filter

    Example: Scorpio Music
    """
    label: String

    """
    The release year to filter

    Example: 1992
    """
    released: String

    """
    The country to filter

    Example: Belgium
    """
    country: String

    """
    Sort items by this field

    Example: released
    """
    sort: DiscogsMasterVersionsFilterSort

    """
    Sort items in a particular order

    Example: asc
    """
    sort_order: DiscogsMasterVersionsFilterSortOrder
  }

  type DiscogsMasterVersionStatsCommunity {
    in_wantlist: Boolean!
    in_collection: Boolean!
  }

  type DiscogsMasterVersionStats {
    community: DiscogsMasterVersionStatsCommunity!
  }

  """
  Retrieves a list of all Releases that are versions of this master
  """
  type DiscogsMasterVersion {
    id: Int!
    label: String!
    country: String!
    title: String!
    format: String!
    catno: String!
    released: String!
    status: String!
    resource_url: String!
    thumb: String!
    major_formats: [String!]!
    stats: DiscogsMasterVersionStats!
    relation: Relation!
  }

  type DiscogsVersionsFilterFacetsValues {
    title: String!
    value: String!
    count: Int!
  }

  type DiscogsMasterVersionsFilterFacets {
    title: String!
    id: String!
    allows_multiple_values: Boolean!
    values: [DiscogsVersionsFilterFacetsValues!]!
  }

  scalar AvailableFilters

  type DiscogsMasterVersionsFilters {
    available: AvailableFilters!
  }

  type GetDiscogsMasterVersions {
    pagination: DiscogsSearchPagination!
    versions: [DiscogsMasterVersion]!
    filter_facets: [DiscogsMasterVersionsFilterFacets]!
    filters: DiscogsMasterVersionsFilters!
  }

  extend type DiscogsMaster {
    getVersions(
      filter: DiscogsMasterVersionsFilterInput
      pagination: DiscogsPaginationParameters
    ): GetDiscogsMasterVersions!
  }

  extend type DiscogsSearchResultMaster {
    getVersions(
      filter: DiscogsMasterVersionsFilterInput
      pagination: DiscogsPaginationParameters
    ): GetDiscogsMasterVersions!
  }
`;

export const resolvers = {
  DiscogsMaster: {
    getVersions: (
      { id }: DiscogsMaster,
      { filter, pagination }: DiscogsSearchResultMasterGetVersionsArgs,
      { dataSources: { discogsApi } }: Context
    ): Promise<GetDiscogsMasterVersions> =>
      discogsApi.lookupMasterVersions(parseInt(id), {
        ...filter,
        ...pagination,
      }),
  },
  DiscogsSearchResultMaster: {
    getVersions: (
      { master_id }: DiscogsSearchResultMaster,
      { filter, pagination }: DiscogsSearchResultMasterGetVersionsArgs,
      { dataSources: { discogsApi } }: Context
    ): Promise<GetDiscogsMasterVersions> =>
      discogsApi.lookupMasterVersions(master_id, { ...filter, ...pagination }),
  },
};
