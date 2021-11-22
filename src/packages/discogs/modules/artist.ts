import { gql } from 'apollo-server';
import {
  DiscogsSearchResultMaster,
  DiscogsMaster,
  GetDiscogsMasterVersions,
  DiscogsSearchResultMasterGetVersionsArgs,
  DiscogsArtist,
  DiscogsLookupArtistArgs,
} from '../types';

import { Relation } from '../../base/types';
import { createRelation, log } from '../../base';

import { Context } from '../';

export const typeDefs = gql`
  type DiscogsArtistMembers {
    id: Int
    name: String
    resource_url: String
    active: Boolean
    thumbnail_url: String
  }

  """
  The Artist resource represents a person in the Discogs database who contributed to a Release in some capacity
  """
  type DiscogsArtist {
    id: ID!
    name: String!
    resource_url: String!
    uri: String!
    releases_url: String!
    profile: String!
    data_quality: String!
    members: [DiscogsArtistMembers!]!
    namevariations: [String!]!
    urls: [String!]!
    images: [DiscogsImageShort!]!
    relation: Relation!
  }

  type DiscogsSearchResultArtist {
    id: ID!
  }

  type SearchDiscogsArtist {
    pagination: DiscogsSearchPagination!
    results: [DiscogsSearchResultArtist!]!
  }

  extend type DiscogsSearch {
    artists(
      search: String
      filter: SearchDiscogsFilter
      pagination: DiscogsPaginationParameters = { page: 1, per_page: 1 }
    ): SearchDiscogsArtist!
  }

  extend type DiscogsLookup {
    """
    Get an artist
    """
    artist(
      """
      The Artist ID

      Example: 108713
      """
      id: Int!
    ): DiscogsArtist
  }
`;

export const resolvers = {
  DiscogsLookup: {
    artist: async (
      _parent: unknown,
      { id }: DiscogsLookupArtistArgs,
      { dataSources: { discogsApi } }: Context
    ): Promise<DiscogsArtist> => {
      return discogsApi.lookupArtist(id);
    },
  },
};
