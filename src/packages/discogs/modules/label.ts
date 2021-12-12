import { gql } from 'apollo-server';
import {
  SearchDiscogsLabel,
  DiscogsSearchLabelsArgs,
  DiscogsLookupLabelArgs,
  DiscogsLabel,
} from '../types';

import { Relation } from '../../base/types';
import { createRelation, log } from '../../base';

import { Context } from '../';

export const typeDefs = gql`
  type DiscogsSearchResultLabel {
    id: ID!
    type: String!
    master_id: Int
    master_url: String
    uri: String!
    title: String!
    thumb: String!
    cover_image: String!
    resource_url: String!
    user_data: DiscogsUserData!
  }

  type SearchDiscogsLabel {
    pagination: DiscogsSearchPagination!
    results: [DiscogsSearchResultLabel!]!
  }

  extend type DiscogsSearch {
    labels(
      search: String
      filter: SearchDiscogsFilter
      pagination: DiscogsPaginationParameters = { page: 1, per_page: 1 }
    ): SearchDiscogsLabel!
  }

  type DiscogsLabel {
    id: ID!
    name: String!
    resource_url: String!
    uri: String!
    releases_url: String!
    contact_info: String!
    profile: String!
    data_quality: String!
    urls: [String!]!
    images: [DiscogsImageShort]!
  }

  extend type DiscogsLookup {
    """
    Get a label
    """
    label(
      """
      The Label ID

      Example: 1
      """
      id: Int!
    ): DiscogsLabel
  }
`;

export const resolvers = {
  DiscogsSearch: {
    labels: (
      _parent: unknown,
      { search, filter, pagination }: DiscogsSearchLabelsArgs,
      { dataSources: { discogsApi } }: Context
    ): Promise<SearchDiscogsLabel> =>
      discogsApi.searchLabels({
        query: search,
        ...filter,
        ...pagination,
      }),
  },

  DiscogsLookup: {
    label: (
      _parent: unknown,
      { id }: DiscogsLookupLabelArgs,
      { dataSources: { discogsApi } }: Context
    ): Promise<DiscogsLabel> => discogsApi.lookupLabel(id),
  },
};

export default { typeDefs, resolvers };
