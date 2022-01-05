import { gql } from 'apollo-server';
import { BaseContext } from 'apollo-server-types';
import { buildSubgraphSchema } from '@apollo/subgraph';

import albumSchema from './modules/album';
// import releaseSchema from './modules/release';
// import masterVersionSchema from './modules/masterVersion';
// import artistSchema from './modules/artist';
// import labelSchema from './modules/label';
// import labelReleasesSchema from './modules/labelReleases';
// import artistReleasesSchema from './modules/artistReleases';

import { SpotifyAPI } from './dataSource';
import { Resolvers } from './types';

export const typeDefs = gql`
  enum IncludeExternal {
    audio
  }

  """
  spotify general search parameters
  """
  input SearchSpotifyFilter {
    """
    If include_external=audio is specified then the response will include any relevant audio content that is hosted externally. By default external content is filtered out from responses.
    """
    include_external: IncludeExternal

    """
    An ISO 3166-1 alpha-2 country code. If a country code is specified, only episodes that are available in that market will be returned.
    If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.
    Note: If neither market or user country are provided, the content is considered unavailable for the client.
    Users can view the country that is associated with their account in the account settings.
    Example value: "ES"
    """
    market: String
  }

  """
  spotify pagination parameters
  """
  input SpotifyPaginationParameters {
    """
    The maximum number of results to return in each item type.
    """
    limit: Int

    """
    The index of the first result to return. Use with limit to get the next page of search results.
    """
    offset: Int
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

  type SpotifyImage {
    """
    The source URL of the image
    """
    url: String!

    """
    The image height in pixels.
    """
    height: Int!

    """
    The image width in pixels.
    """
    width: Int!
  }

  type SpotifyExternalUrls {
    """
    The Spotify URL for the object.
    """
    spotify: String!
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
  Search: {
    spotify: (): any => ({}),
  },
  Lookup: {
    spotify: (): any => ({}),
  },
  Relation: {
    spotify: (parent): any => {
      return parent;
    },
  },
  SpotifySearch: {
    id: () => `${+new Date()}`,
  },
  SpotifyLookup: {
    id: () => `${+new Date()}`,
  },
};

export const dataSources = () => ({
  spotifyApi: new SpotifyAPI(),
});

export interface Context extends BaseContext {
  dataSources: ReturnType<typeof dataSources>;
}

const schemaDefinition = [
  { typeDefs, resolvers },
  albumSchema,
  // releaseSchema,
  // masterVersionSchema,
  // artistSchema,
  // artistReleasesSchema,
  // labelSchema,
  // labelReleasesSchema,
];

export const schema = buildSubgraphSchema(schemaDefinition);

export default schemaDefinition;
