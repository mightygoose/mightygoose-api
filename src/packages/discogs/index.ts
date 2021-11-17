import { gql } from 'apollo-server';
import { DiscogsAPI } from './dataSource';
import {
  typeDefs as masterTypeDefs,
  resolvers as masterResolvers,
} from './modules/master';

export const typeDefs = gql`
  extend enum Services {
    Discogs
  }

  """
  discogs general search parameters
  """
  input SearchDiscogsFilter {
    """
    Example: nirvana
    """
    query: String

    """
    Example: nirvana - nevermind
    """
    title: String

    """
    Example: nevermind
    """
    release_title: String

    """
    Example: kurt
    """
    credit: String

    """
    Example: nirvana
    """
    artist: String

    """
    Example: nirvana
    """
    anv: String

    """
    Example: dgc
    """
    label: String

    """
    Example: rock
    """
    genre: String

    """
    Example: grunge
    """
    style: String

    """
    Example: canada
    """
    country: String

    """
    Example: 1991
    """
    year: Int

    """
    Example: album
    """
    format: String

    """
    Example: DGCD-24425
    """
    catno: String

    """
    Example: 7 2064-24425-2 4
    """
    barcode: String

    """
    Example: smells like teen spirit
    """
    track: String

    """
    Example: milKt
    """
    submitter: String

    """
    Example: jerome99
    """
    contributor: String
  }

  """
  discogs pagination parameters
  """
  input DiscogsPaginationParameters {
    page: Int! = 1
    per_page: Int! = 5
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
`;

export const resolvers = {
  Search: {
    discogs: <T>(parent: T): T => parent,
  },
  DiscogsSearch: {
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
];
