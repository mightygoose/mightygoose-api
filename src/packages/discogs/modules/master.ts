import { gql } from 'apollo-server';
import { Resolvers } from '../types';

import { createRelation, log } from '../../base';

import { Context } from '../';

export const typeDefs = gql`
  """
  The Master resource represents a set of similar Releases. Masters (also known as “master releases”) have a “main release” which is often the chronologically earliest
  """
  type DiscogsMaster {
    id: ID!
    main_release: Int!
    most_recent_release: Int!
    resource_url: String!
    uri: String!
    versions_url: String!
    main_release_url: String!
    most_recent_release_url: String!
    num_for_sale: Int!
    lowest_price: Float!
    images: [DiscogsImageShort]!
    genres: [String!]!
    styles: [String!]!
    year: Int!
    tracklist: [DiscogsTrackShort]!
    artists: [DiscogsArtistShort]!
    title: String!
    notes: String!
    data_quality: String!
    videos: [DiscogsVideo]!
    relation: Relation!
  }

  type DiscogsSearchResultMaster {
    id: ID!
    master_id: Int!
    master_url: String!
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
    resource_url: String!
    community: DiscogsCommunity!
    master: DiscogsMaster!
    relation: Relation!
  }

  type SearchDiscogsMaster {
    pagination: DiscogsSearchPagination!
    results: [DiscogsSearchResultMaster!]!
  }

  extend type DiscogsSearchResultRelease {
    master: DiscogsMaster!
  }

  extend type DiscogsRelease {
    master: DiscogsMaster!
  }

  extend type DiscogsArtistMaster {
    master: DiscogsMaster!
  }

  extend type DiscogsSearch {
    masters(
      search: String
      filter: SearchDiscogsFilter
      pagination: DiscogsPaginationParameters = { page: 1, per_page: 1 }
    ): SearchDiscogsMaster!
  }

  extend type DiscogsRelation {
    masters(
      pagination: DiscogsPaginationParameters = { page: 1, per_page: 1 }
    ): SearchDiscogsMaster!
  }

  extend type DiscogsLookup {
    master(id: Int!): DiscogsMaster
  }
`;

export const resolvers: Resolvers<Context> = {
  DiscogsSearch: {
    masters: (
      _parent,
      { search, filter, pagination },
      { dataSources: { discogsApi } }
    ) =>
      discogsApi.searchMasters({
        query: search,
        ...filter,
        ...pagination,
      }),
  },
  DiscogsLookup: {
    master: (_parent, { id }, { dataSources: { discogsApi } }) =>
      discogsApi.lookupMaster(id),
  },
  DiscogsSearchResultMaster: {
    master: ({ master_id }, _params, { dataSources: { discogsApi } }) =>
      discogsApi.lookupMaster(master_id),
    relation: ({ type, year, title, country, genre }) => {
      const [artist, album] = title.split(' - ');
      return createRelation({
        type,
        title,
        album,
        artist,
        artists: artist.split(' / '),
        year: parseInt(year),
        country,
        genre,
      });
    },
  },
  DiscogsMaster: {
    relation: ({ year, title, artists }) => {
      const artistsFlatened =
        artists?.reduce<Array<string>>((acc, artist) => {
          if (typeof artist?.name !== 'undefined') {
            return [...acc, artist.name];
          }
          return acc;
        }, []) || [];

      const artist = artistsFlatened.join(' / ');

      return createRelation({
        type: 'master',
        artist,
        artists: artistsFlatened,
        album: title,
        title: `${artist} - ${title}`,
        year,
      });
    },
  },
  DiscogsRelation: {
    masters: (
      { _relationData: { title, year, artist, album, country, ...rest } },
      { pagination },
      { dataSources: { discogsApi } }
    ) => {
      console.log(
        '[make search masters]',
        title,
        year,
        artist,
        album,
        country,
        rest
      );
      return discogsApi.searchMasters({
        year,
        artist,
        country,
        query: title,
        ...pagination,
      });
    },
  },
  DiscogsSearchResultRelease: {
    master: ({ master_id }, _params, { dataSources: { discogsApi } }) =>
      discogsApi.lookupMaster(master_id),
  },
  DiscogsRelease: {
    master: ({ master_id }, _params, { dataSources: { discogsApi } }) =>
      discogsApi.lookupMaster(master_id),
  },
  DiscogsArtistMaster: {
    master: ({ id }, _params, { dataSources: { discogsApi } }) =>
      discogsApi.lookupMaster(parseInt(id)),
  },
};

export default { typeDefs, resolvers };
