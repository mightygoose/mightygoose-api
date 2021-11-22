import { gql } from 'apollo-server';
import { BaseContext } from 'apollo-server-types';
import { DiscogsAPI } from './dataSource';
import {
  typeDefs as masterTypeDefs,
  resolvers as masterResolvers,
} from './modules/master';
import {
  typeDefs as releaseTypeDefs,
  resolvers as releaseResolvers,
} from './modules/release';
import {
  typeDefs as masterVersionTypeDefs,
  resolvers as masterVersionResolvers,
} from './modules/masterVersion';

import {
  typeDefs as artistTypeDefs,
  resolvers as artistResolvers,
} from './modules/artist';

export const typeDefs = gql`
  extend enum Services {
    Discogs
  }

  enum DiscogsCurrencies {
    USD
    GBP
    EUR
    CAD
    AUD
    JPY
    CHF
    MXN
    BRL
    NZD
    SEK
    ZAR
  }

  """
  discogs general search parameters
  """
  input SearchDiscogsFilter {
    """
    Your search query

    Example: nirvana
    """
    query: String

    """
    Example: nirvana - nevermind
    """
    title: String

    """
    Search release titles

    Example: nevermind
    """
    release_title: String

    """
    Search release credits

    Example: kurt
    """
    credit: String

    """
    Search artist names

    Example: nirvana
    """
    artist: String

    """
    Search artist ANV (Artist Name Variation)

    Example: nirvana
    """
    anv: String

    """
    Search label names

    Example: dgc
    """
    label: String

    """
    Search genres

    Example: rock
    """
    genre: String

    """
    Search styles

    Example: grunge
    """
    style: String

    """
    Search release country

    Example: canada
    """
    country: String

    """
    Search release year

    Example: 1991
    """
    year: Int

    """
    Search formats

    Example: album
    """
    format: String

    """
    Search catalog number

    Example: DGCD-24425
    """
    catno: String

    """
    Search barcodes

    Example: 7 2064-24425-2 4
    """
    barcode: String

    """
    Search track titles

    Example: smells like teen spirit
    """
    track: String

    """
    Search submitter username

    Example: milKt
    """
    submitter: String

    """
    Search contributor usernames

    Example: jerome99
    """
    contributor: String
  }

  """
  discogs pagination parameters
  """
  input DiscogsPaginationParameters {
    """
    The page you want to request

    Example: 3
    """
    page: Int! = 1

    """
    The number of items per page

    Example: 5
    """
    per_page: Int! = 5
  }

  type DiscogsImageShort {
    type: String!
    uri: String!
    resource_url: String!
    uri150: String!
    width: Int!
    height: Int!
  }

  type DiscogsTrackShort {
    position: String!
    type_: String!
    title: String!
    duration: String!
  }

  type DiscogsVideo {
    uri: String!
    title: String!
    description: String!
    duration: Int!
    embed: Boolean!
  }

  type DiscogsRelation {
    id: ID!
  }

  extend type Relation {
    discogs: DiscogsRelation!
  }

  type DiscogsSearchPaginationUrls {
    first: String
    last: String
    prev: String
    next: String
  }

  type DiscogsSearchPagination {
    page: Int!
    pages: Int!
    per_page: Int!
    items: Int!
    urls: DiscogsSearchPaginationUrls!
  }

  type DiscogsCommunity {
    want: Int!
    have: Int!
  }

  type DiscogsSearch {
    id: ID!
  }

  extend type Search {
    discogs: DiscogsSearch!
  }

  type DiscogsLookup {
    id: ID!
  }

  extend type Lookup {
    discogs: DiscogsLookup!
  }
`;

export interface Context extends BaseContext {
  dataSources: typeof dataSources;
}

export const resolvers = {
  Search: {
    discogs: <T>(parent: T): T => parent,
  },
  Lookup: {
    discogs: <T>(parent: T): T => parent,
  },
  DiscogsSearch: {
    id: () => +new Date(),
  },
  DiscogsLookup: {
    id: () => +new Date(),
  },
  Relation: {
    discogs: <T>(parent: T): T => parent,
  },
  DiscogsRelation: {
    id: () => +new Date(),
  },
};

export const dataSources = { discogsApi: new DiscogsAPI() };

export default [
  { typeDefs, resolvers },
  { typeDefs: masterTypeDefs, resolvers: masterResolvers },
  { typeDefs: releaseTypeDefs, resolvers: releaseResolvers },
  { typeDefs: masterVersionTypeDefs, resolvers: masterVersionResolvers },
  { typeDefs: artistTypeDefs, resolvers: artistResolvers },
];
