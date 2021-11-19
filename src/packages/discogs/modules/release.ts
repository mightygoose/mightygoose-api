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
  type DiscogsRelease {
    id: ID!
  }

  type DiscogsFormat {
    name: String!
    qty: String!
    text: String
    descriptions: [String!]!
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
    formats: [DiscogsFormat!]
    release: DiscogsRelease!
    #relation: Relation!
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
  // DiscogsLookup: {
  // releases: (
  // _parent: unknown,
  // { id }: DiscogsLookupReleasesArgs,
  // { dataSources: { discogsApi } }: Context
  // ): Promise<DiscogsRelease> => discogsApi.lookupRelease(id),
  // },
  // DiscogsSearchResultRelease: {
  // release: (
  // { release_id }: DiscogsSearchResultRelease,
  // _params: unknown,
  // { dataSources: { discogsApi } }: Context
  // ): Promise<DiscogsRelease> => discogsApi.lookupRelease(release_id),
  // relation: ({
  // type,
  // year,
  // title,
  // country,
  // genre,
  // }: DiscogsSearchResultRelease): Relation =>
  // createRelation({
  // type,
  // title,
  // album: title.split(' - ')[1],
  // artist: title.split(' - ')[0],
  // year: parseInt(year),
  // country,
  // genre,
  // }),
  // },
  // DiscogsRelease: {
  // relation: ({ year, title, artists }: DiscogsRelease): Relation => {
  // const artist = artists
  // ?.map((artist) => (artist ? artist.name : ''))
  // .join(' & ');
  // const album = title;

  // return createRelation({
  // type: 'release',
  // artist,
  // album,
  // title: `${artist} - ${album}`,
  // year,
  // });
  // },
  // },
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
