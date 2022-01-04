import { gql } from 'apollo-server';
import { BaseContext } from 'apollo-server-types';
import { buildSubgraphSchema } from '@apollo/subgraph';

// import masterSchema from './modules/master';
// import releaseSchema from './modules/release';
// import masterVersionSchema from './modules/masterVersion';
// import artistSchema from './modules/artist';
// import labelSchema from './modules/label';
// import labelReleasesSchema from './modules/labelReleases';
// import artistReleasesSchema from './modules/artistReleases';

import { SpotifyAPI } from './dataSource';
import { Resolvers } from './types';

export const typeDefs = gql`
  enum SpotifySortOrder {
    asc
    desc
  }

  enum SpotifyCurrencies {
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
  spotify general search parameters
  """
  input SearchSpotifyFilter {
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
  spotify pagination parameters
  """
  input SpotifyPaginationParameters {
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

  type SpotifyImageShort {
    type: String!
    uri: String!
    resource_url: String!
    uri150: String!
    width: Int!
    height: Int!
  }

  type SpotifyTrackShort {
    position: String!
    type_: String!
    title: String!
    duration: String!
  }

  type SpotifyVideo {
    uri: String!
    title: String!
    description: String!
    duration: Int!
    embed: Boolean!
  }

  extend type RelationData {
    type: String @external
    title: String @external
    album: String @external
    artist: String @external
    artists: [String!] @external
    year: Int @external
    country: String @external
    genre: [String!] @external
  }

  type SpotifyRelation {
    _relationData: RelationData!
      @provides(fields: "type title album year artist artists country genre")
  }

  extend type Relation @key(fields: "_relationData") {
    _relationData: RelationData! @external
    spotify: SpotifyRelation @requires(fields: "_relationData")
  }

  type SpotifySearchPaginationUrls {
    first: String
    last: String
    prev: String
    next: String
  }

  type SpotifySearchPagination {
    page: Int!
    pages: Int!
    per_page: Int!
    items: Int!
    urls: SpotifySearchPaginationUrls!
  }

  type SpotifyCommunity {
    want: Int!
    have: Int!
  }

  type SpotifyUserData {
    in_wantlist: Boolean!
    in_collection: Boolean!
  }

  type SpotifySearch {
    id: ID!
  }

  extend type Search @key(fields: "id") {
    id: ID! @external
    spotify: SpotifySearch!
  }

  type SpotifyLookup {
    id: ID!
  }

  extend type Lookup @key(fields: "id") {
    id: ID! @external
    spotify: SpotifyLookup!
  }
`;

export const resolvers: Resolvers<Context> = {
  // Search: {
  // spotify: (): any => ({}),
  // },
  // Lookup: {
  // spotify: (): any => ({}),
  // },
  // Relation: {
  // spotify: (parent): any => {
  // return parent;
  // },
  // },
  // SpotifySearch: {
  // id: () => `${+new Date()}`,
  // },
  // SpotifyLookup: {
  // id: () => `${+new Date()}`,
  // },
};

export const dataSources = () => ({ spotifyApi: new SpotifyAPI() });

export interface Context extends BaseContext {
  dataSources: ReturnType<typeof dataSources>;
}

const schemaDefinition = [
  { typeDefs, resolvers },
  // masterSchema,
  // releaseSchema,
  // masterVersionSchema,
  // artistSchema,
  // artistReleasesSchema,
  // labelSchema,
  // labelReleasesSchema,
];

export const schema = buildSubgraphSchema(schemaDefinition);

export default schemaDefinition;
