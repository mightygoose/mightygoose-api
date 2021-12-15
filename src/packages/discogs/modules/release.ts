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
  DiscogsArtistRelease,
  DiscogsArtistMaster,
  Resolvers,
} from '../types';

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

  extend type DiscogsArtistRelease {
    release(curr_abbr: DiscogsCurrencies): DiscogsRelease!
  }

  extend type DiscogsArtistMaster {
    release(curr_abbr: DiscogsCurrencies): DiscogsRelease!
  }

  extend type DiscogsMaster {
    release(type: DiscogsMasterReleaseType! = main): DiscogsRelease!
  }

  extend type DiscogsMasterVersion {
    release(curr_abbr: DiscogsCurrencies): DiscogsRelease!
    rating: DiscogsReleaseRatingWrapper!
  }

  enum DiscogsArtistRelesesSort {
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

export const resolvers: Resolvers<Context> = {
  DiscogsSearch: {
    releases: (
      _parent,
      { search, filter, pagination },
      { dataSources: { discogsApi } }
    ) =>
      discogsApi.searchReleases({
        query: search,
        ...filter,
        ...pagination,
      }),
  },
  DiscogsLookup: {
    release: (_parent, { id, curr_abbr }, { dataSources: { discogsApi } }) =>
      discogsApi.lookupRelease(id, curr_abbr),
  },
  DiscogsSearchResultRelease: {
    release: ({ id }, { curr_abbr }, { dataSources: { discogsApi } }) =>
      discogsApi.lookupRelease(parseInt(id), curr_abbr),
    relation: ({ type, year, title, country, genre }) =>
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
    rating: ({ id }, _params, { dataSources: { discogsApi } }) =>
      discogsApi.lookupReleaseRating(parseInt(id)),
  },
  DiscogsMaster: {
    release: (
      { main_release, most_recent_release },
      { type },
      { dataSources: { discogsApi } }
    ) => {
      return discogsApi.lookupRelease(
        type === 'main' ? main_release : most_recent_release
      );
    },
  },
  DiscogsMasterVersion: {
    release: ({ id }, { curr_abbr }, { dataSources: { discogsApi } }) =>
      discogsApi.lookupRelease(id, curr_abbr),
    rating: ({ id }, _params, { dataSources: { discogsApi } }) =>
      discogsApi.lookupReleaseRating(id),
  },
  DiscogsRelease: {
    relation: ({ year, title, artists: artistsList }) => {
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
    rating: ({ id }, _params, { dataSources: { discogsApi } }) =>
      discogsApi.lookupReleaseRating(parseInt(id)),
  },
  DiscogsArtistRelease: {
    release: ({ id }, { curr_abbr }, { dataSources: { discogsApi } }) =>
      discogsApi.lookupRelease(parseInt(id), curr_abbr),
  },
  DiscogsArtistMaster: {
    release: (
      { main_release },
      { curr_abbr },
      { dataSources: { discogsApi } }
    ) => discogsApi.lookupRelease(main_release, curr_abbr),
  },
  DiscogsRelation: {
    releases: (
      { _relationData: { title, year, artist, album, country, ...rest } },
      { pagination },
      { dataSources: { discogsApi } }
    ) => {
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
