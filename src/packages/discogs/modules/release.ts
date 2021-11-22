import { gql } from 'apollo-server';
import {
  DiscogsSearchReleasesArgs,
  DiscogsSearchResultRelease,
  DiscogsRelease,
  SearchDiscogsRelease,
  DiscogsLookupReleaseArgs,
  DiscogsRelationReleasesArgs,
  DiscogsMaster,
  DiscogsMasterVersion,
  DiscogsSearchResultReleaseReleaseArgs,
  DiscogsMasterVersionReleaseArgs,
  DiscogsMasterReleaseArgs,
  DiscogsReleaseRatingWrapper,
} from '../types';

import { Relation } from '../../base/types';
import { createRelation, log } from '../../base';

import { Context, dataSources } from '../';

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

  """
  Retrieves the community release rating average and count
  """
  type DiscogsReleaseRating {
    count: Int!
    average: Float!
  }

  type DiscogsReleaseRatingWrapper {
    release_id: Int!
    rating: DiscogsReleaseRating!
  }

  """
  The Release resource represents a particular physical or digital object released by one or more Artists.
  """
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

    """
    The Community Release Rating endpoint retrieves the average rating and the total number of user ratings for a given release
    """
    rating: DiscogsReleaseRatingWrapper!

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
    release(curr_abbr: DiscogsCurrencies): DiscogsRelease!
    rating: DiscogsReleaseRatingWrapper!
    relation: Relation!
  }

  type SearchDiscogsRelease {
    pagination: DiscogsSearchPagination!
    results: [DiscogsSearchResultRelease!]!
  }

  enum DiscogsMasterReleaseType {
    main
    most_recent
  }

  extend type DiscogsMaster {
    release(type: DiscogsMasterReleaseType = main): DiscogsRelease!
  }

  extend type DiscogsMasterVersion {
    release(curr_abbr: DiscogsCurrencies): DiscogsRelease!
    rating: DiscogsReleaseRatingWrapper!
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
    release(
      """
      The Release ID

      Example: 249504
      """
      id: Int!

      """
      Currency for marketplace data. Defaults to the authenticated users currency
      """
      curr_abbr: DiscogsCurrencies
    ): DiscogsRelease
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
    release: (
      _parent: unknown,
      { id, curr_abbr }: DiscogsLookupReleaseArgs,
      { dataSources: { discogsApi } }: Context
    ): Promise<DiscogsRelease> => discogsApi.lookupRelease(id, curr_abbr),
  },
  DiscogsSearchResultRelease: {
    release: (
      { id }: DiscogsSearchResultRelease,
      { curr_abbr }: DiscogsSearchResultReleaseReleaseArgs,
      { dataSources: { discogsApi } }: Context
    ): Promise<DiscogsRelease> =>
      discogsApi.lookupRelease(parseInt(id), curr_abbr),
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
    rating: (
      { id }: DiscogsSearchResultRelease,
      _params: unknown,
      { dataSources: { discogsApi } }: Context
    ): Promise<DiscogsReleaseRatingWrapper> =>
      discogsApi.lookupReleaseRating(parseInt(id)),
  },
  DiscogsMaster: {
    release: (
      { main_release, most_recent_release }: DiscogsMaster,
      { type }: DiscogsMasterReleaseArgs,
      { dataSources: { discogsApi } }: Context
    ): Promise<DiscogsRelease> => {
      return discogsApi.lookupRelease(
        type === 'main' ? main_release : most_recent_release
      );
    },
  },
  DiscogsMasterVersion: {
    release: (
      { id }: DiscogsMasterVersion,
      { curr_abbr }: DiscogsMasterVersionReleaseArgs,
      { dataSources: { discogsApi } }: Context
    ): Promise<DiscogsRelease> => discogsApi.lookupRelease(id, curr_abbr),
    rating: (
      { id }: DiscogsMasterVersion,
      _params: unknown,
      { dataSources: { discogsApi } }: Context
    ): Promise<DiscogsReleaseRatingWrapper> =>
      discogsApi.lookupReleaseRating(id),
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
    rating: (
      { id }: DiscogsRelease,
      _params: unknown,
      { dataSources: { discogsApi } }: Context
    ): Promise<DiscogsReleaseRatingWrapper> =>
      discogsApi.lookupReleaseRating(parseInt(id)),
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
