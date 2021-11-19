import { gql } from 'apollo-server';
import {
  DiscogsSearchReleasesArgs,
  DiscogsSearchResultRelease,
  DiscogsRelease,
  SearchDiscogsRelease,
  DiscogsLookupReleasesArgs,
  DiscogsRelationReleasesArgs,
} from '../types';

import { Relation } from '../../base/types';
import { createRelation, log } from '../../base';

import { Context } from '../';

export const typeDefs = gql`
  type DiscogsReleaseCommunityRating {
    count: Int!
    average: Float!
  }

  type DiscogsReleaseCommunityUser {
    count: Int!
    average: Float!
  }

  type DiscogsReleaseIdentifier {
    count: Int!
    average: Float!
  }

  type DiscogsReleaseCommunity {
    have: Int!
    want: Int!
    rating: DiscogsReleaseCommunityRating!
    submitter: DiscogsReleaseCommunityUser!
    contributors: [DiscogsReleaseCommunityUser!]!
    data_quality: String!
    status: String!
  }

  type DiscogsReleaseLabel {
    id: ID!
    name: String!
    catno: String!
    entity_type: String!
    entity_type_name: String!
    resource_url: String!
    thumbnail_url: String!
  }

  type DiscogsReleaseFormat {
    name: String!
    qty: String!
    text: String
    descriptions: [String!]!
  }

  type DiscogsRelease {
    id: ID!
    status: String!
    year: Int!
    resource_url: String!
    uri: String!
    artists: [DiscogsArtistShort]!
    artists_sort: String!
    labels: [DiscogsReleaseLabel!]!
    series: [DiscogsReleaseLabel!]!
    companies: [DiscogsReleaseLabel!]!
    formats: [DiscogsReleaseFormat!]
    data_quality: String!
    community: DiscogsReleaseCommunity!
    format_quantity: Int!
    date_added: String!
    date_changed: String!
    num_for_sale: Int!
    lowest_price: Float
    master_id: Int!
    master_url: String!
    title: String!
    country: String!
    released: String!
    notes: String!
    released_formatted: String!
    identifiers: [DiscogsReleaseIdentifier!]!
    videos: [DiscogsVideo!]!
    genres: [String!]!
    styles: [String!]!
    tracklist: [DiscogsTrackShort]!
    extraartists: [DiscogsArtistShort!]!
    images: [DiscogsImageShort]!
    thumb: String!
    estimated_weight: Int!
    blocked_from_sale: Boolean!
    relation: Relation!
  }

  type DiscogsSearchResultRelease {
    id: ID!
    master_id: Int!
    master_url: String!
    resource_url: String!
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
    community: DiscogsCommunity!
    format_quantity: Int!
    formats: [DiscogsReleaseFormat!]
    release: DiscogsRelease!
    relation: Relation!
  }

  type SearchDiscogsRelease {
    pagination: DiscogsSearchPagination!
    results: [DiscogsSearchResultRelease!]!
  }

  extend type DiscogsSearch {
    releases(
      search: String
      filter: SearchDiscogsFilter
      pagination: DiscogsPaginationParameters = { page: 1, per_page: 1 }
    ): SearchDiscogsRelease!
  }

  extend type DiscogsRelation {
    releases(
      pagination: DiscogsPaginationParameters = { page: 1, per_page: 1 }
    ): SearchDiscogsRelease!
  }

  extend type DiscogsLookup {
    releases(id: Int!): DiscogsRelease
  }
`;

export const resolvers = {
  DiscogsSearch: {
    releases: (
      _parent: unknown,
      { search, filter, pagination }: DiscogsSearchReleasesArgs,
      { dataSources: { discogsApi } }: Context
    ): Promise<SearchDiscogsRelease> =>
      discogsApi.searchReleases({
        query: search,
        ...filter,
        ...pagination,
      }),
  },
  DiscogsLookup: {
    releases: (
      _parent: unknown,
      { id }: DiscogsLookupReleasesArgs,
      { dataSources: { discogsApi } }: Context
    ): Promise<DiscogsRelease> => discogsApi.lookupRelease(id),
  },
  DiscogsSearchResultRelease: {
    release: (
      { id }: DiscogsSearchResultRelease,
      _params: unknown,
      { dataSources: { discogsApi } }: Context
    ): Promise<DiscogsRelease> => discogsApi.lookupRelease(parseInt(id)),
    relation: ({
      type,
      year,
      title,
      country,
      genre,
    }: DiscogsSearchResultRelease): Relation =>
      createRelation({
        type,
        title,
        album: title.split(' - ')[1],
        artist: title.split(' - ')[0],
        artists: [title.split(' - ')[0]],
        year: parseInt(year),
        country,
        genre,
      }),
  },
  DiscogsRelease: {
    relation: ({
      year,
      title,
      artists: artistsList,
    }: DiscogsRelease): Relation => {
      const artists = artistsList?.map((artist) => (artist ? artist.name : ''));
      const artist = artists.join(' & ');
      const album = title;

      return createRelation({
        type: 'release',
        artist,
        artists,
        album,
        title: `${artist} - ${album}`,
        year,
      });
    },
  },
  DiscogsRelation: {
    releases: (
      {
        _relationData: { title, year, artist, album, country, ...rest },
      }: Relation,
      { pagination }: DiscogsRelationReleasesArgs,
      { dataSources: { discogsApi } }: Context
    ): Promise<SearchDiscogsRelease> => {
      console.log(
        '[make search Releases]',
        title,
        year,
        artist,
        album,
        country,
        rest
      );
      return discogsApi.searchReleases({
        year,
        artist,
        country,
        query: title,
        ...pagination,
      });
    },
  },
};
