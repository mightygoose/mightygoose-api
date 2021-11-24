import { gql } from 'apollo-server';

import {
  DiscogsRelationArtistsArgs,
  DiscogsLookupArtistArgs,
  DiscogsArtist,
  SearchDiscogsArtist,
  DiscogsSearchArtistsArgs,
  DiscogsSearchResultArtist,
  DiscogsArtistShort,
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
    type: String!
    uri: String!
    title: String!
    thumb: String!
    cover_image: String!
    resource_url: String!
    user_data: DiscogsMasterVersionStatsCommunity!
    relation: Relation!
  }

  type DiscogsArtistShort {
    id: ID!
    name: String!
    anv: String!
    join: String!
    role: String!
    tracks: String!
    resource_url: String!
    thumbnail_url: String!
    relation: Relation!
    artist: DiscogsArtist!
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

  extend type DiscogsRelation {
    artists(
      pagination: DiscogsPaginationParameters = { page: 1, per_page: 1 }
    ): SearchDiscogsArtist
  }
`;

export const resolvers = {
  DiscogsLookup: {
    artist: (
      _parent: unknown,
      { id }: DiscogsLookupArtistArgs,
      { dataSources: { discogsApi } }: Context
    ): Promise<DiscogsArtist> => {
      return discogsApi.lookupArtist(id);
    },
  },
  DiscogsSearch: {
    artists: (
      _parent: unknown,
      { search, filter, pagination }: DiscogsSearchArtistsArgs,
      { dataSources: { discogsApi } }: Context
    ): Promise<SearchDiscogsArtist> => {
      return discogsApi.searchArtists({
        query: search,
        ...filter,
        ...pagination,
      });
    },
  },
  DiscogsArtist: {
    relation: ({ name: artist }: DiscogsArtist): Relation =>
      createRelation({
        type: 'artist',
        artist,
        artists: [artist],
      }),
  },
  DiscogsSearchResultArtist: {
    relation: ({ type, title: artist }: DiscogsSearchResultArtist): Relation =>
      createRelation({
        type,
        artist,
        artists: [artist],
      }),
  },
  DiscogsArtistShort: {
    artist: (
      { id }: DiscogsArtistShort,
      _params: unknown,
      { dataSources: { discogsApi } }: Context
    ): Promise<DiscogsArtist> => discogsApi.lookupArtist(parseInt(id)),
    relation: ({ name: artist }: DiscogsArtistShort): Relation =>
      createRelation({
        type: 'artist',
        artist,
        artists: [artist],
      }),
  },
  DiscogsRelation: {
    artists: (
      { _relationData: { artist, artists, ...rest } }: Relation,
      { pagination }: DiscogsRelationArtistsArgs,
      { dataSources: { discogsApi } }: Context
    ): Promise<SearchDiscogsArtist> | null =>
      artist
        ? discogsApi.searchArtists({
            title: artists?.join(' / '),
            ...pagination,
          })
        : null,
  },
};
