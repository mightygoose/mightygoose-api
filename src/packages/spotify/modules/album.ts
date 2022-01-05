import { gql } from 'apollo-server';

import { Resolvers } from '../types';

import { createRelation, log } from '../../base';

import { Context } from '../';

export const typeDefs = gql`
  type SearchSpotifyAlbum {
    #pagination: SpotifySearchPagination!
    #results: [SpotifySearchResultArtist!]!
    foo: String
  }

  extend type SpotifySearch {
    albums(
      """
      Your search query.

      You can narrow down your search using field filters. The available filters are album, artist, track, year, upc, tag:hipster, tag:new, isrc, and genre. Each field filter only applies to certain result types.

      The artist filter can be used while searching albums, artists or tracks.
      The album and year filters can be used while searching albums or tracks. You can filter on a single year or a range (e.g. 1955-1960).
      The genre filter can be use while searching tracks and artists.
      The isrc and track filters can be used while searching tracks.
      The upc, tag:new and tag:hipster filters can only be used while searching albums. The tag:new filter will return albums released in the past two weeks and tag:hipster can be used to return only albums with the lowest 10% popularity.


      You can also use the NOT operator to exclude keywords from your search.
      Example value:
      "remaster%20track:Doxy+artist:Miles%20Davis"
      """
      q: String!

      filter: SearchSpotifyFilter
      pagination: SpotifyPaginationParameters = { limit: 1, offset: 0 }
    ): SearchSpotifyAlbum!
  }

  enum AlbumTypes {
    album
    single
    compilation
  }

  enum ReleaseDatePrecision {
    year
    month
    day
  }

  enum AlbumType {
    album
  }

  enum SpotifyRestrictionReason {
    market
    product
    explicit
  }

  type SpotifyRestrictions {
    """
    The reason for the restriction. Albums may be restricted if the content is not available in a given market,
    to the user's subscription type, or when the user's account is set to not play explicit content.
    Additional reasons may be added in the future.
    """
    reason: SpotifyRestrictionReason!
  }

  type SpotifyAlbum {
    """
    The Spotify ID for the album.
    """
    id: ID!

    """
    The type of the album.
    """
    album_type: AlbumTypes!

    """
    The number of tracks in the album.
    """
    total_tracks: Int!

    """
    A link to the Web API endpoint providing full details of the album.
    """
    href: String!

    """
    The name of the album. In case of an album takedown, the value may be an empty string.
    """
    name: String!

    """
    The date the album was first released.
    """
    release_date: String!

    """
    The precision with which release_date value is known.
    """
    release_date_precision: ReleaseDatePrecision!

    """
    The object type.
    """
    type: AlbumType!

    """
    The Spotify URI for the album.
    """
    uri: String!

    #"""
    #The object type.
    #"""
    #tracks: [SpotifyTrack]
    #artists: [Artists]

    """
    Included in the response when a content restriction is applied.
    """
    restrictions: SpotifyRestrictions!

    """
    The cover art for the album in various sizes, widest first.
    """
    images: [SpotifyImage!]!

    """
    Known external URLs for this album.
    """
    external_urls: SpotifyExternalUrls!

    """
    The markets in which the album is available: ISO 3166-1 alpha-2 country codes.
    NOTE: an album is considered available in a market when at least 1 of its tracks is available in that market.
    """
    available_markets: [String!]!

    relation: Relation!
  }

  extend type SpotifyLookup {
    """
    Get Spotify catalog information for a single album
    https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-album
    """
    album(
      """
      The Spotify ID of the album.

      Example: "4aawyAB9vmqN3uQ7FjRGTy"
      """
      id: ID!

      """
      An ISO 3166-1 alpha-2 country code. If a country code is specified, only episodes that are available in that market will be returned.
      If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.
      Note: If neither market or user country are provided, the content is considered unavailable for the client.
      Users can view the country that is associated with their account in the account settings.
      """
      market: String
    ): SpotifyAlbum
  }

  #extend type SpotifyRelation {
  #  albums(
  #    pagination: SpotifyPaginationParameters = { page: 1, per_page: 1 }
  #  ): SearchSpotifyAlbum
  #}
`;

export const resolvers: Resolvers<Context> = {
  SpotifyLookup: {
    album: (_parent, params, { dataSources: { spotifyApi } }) =>
      spotifyApi.lookupAlbum(params),
  },
  // SpotifySearch: {
  // artists: (
  // _parent,
  // { search, filter, pagination },
  // { dataSources: { discogsApi } }
  // ) => {
  // return discogsApi.searchArtists({
  // query: search,
  // ...filter,
  // ...pagination,
  // });
  // },
  // },
  // SpotifyArtist: {
  // relation: ({ name: artist }) =>
  // createRelation({
  // type: 'artist',
  // artist,
  // artists: [artist],
  // }),
  // },
  // SpotifySearchResultArtist: {
  // relation: ({ type, title: artist }) =>
  // createRelation({
  // type,
  // artist,
  // artists: [artist],
  // }),
  // },
  // SpotifyArtistShort: {
  // artist: ({ id }, _params, { dataSources: { discogsApi } }) =>
  // discogsApi.lookupArtist(parseInt(id)),
  // relation: ({ name: artist }) =>
  // createRelation({
  // type: 'artist',
  // artist,
  // artists: [artist],
  // }),
  // },
  // SpotifyRelation: {
  // artists: (
  // { _relationData: { artist, artists, ...rest } },
  // { pagination },
  // { dataSources: { discogsApi } }
  // ) =>
  // artist
  // ? discogsApi.searchArtists({
  // title: artists?.join(' / '),
  // ...pagination,
  // })
  // : null,
  // },
};

export default { typeDefs, resolvers };
