import { gql } from 'apollo-server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { Relation, RelationData, Resolvers } from './types';

export const typeDefs = gql`
  #enum Services {
  #  BASE
  #}

  type RelationData
    @key(fields: "title")
    @key(fields: "type")
    @key(fields: "album")
    @key(fields: "artist")
    @key(fields: "artists")
    @key(fields: "country")
    @key(fields: "genre")
    @key(fields: "year") {
    type: String
    title: String
    album: String
    artist: String
    artists: [String!]
    year: Int
    country: String
    genre: [String!]
  }

  type Relation @key(fields: "_relationData") {
    _relationData: RelationData!
  }

  type Search @key(fields: "id") {
    id: ID!
  }

  type Lookup @key(fields: "id") {
    id: ID!
  }

  extend type Query {
    search: Search!
    lookup: Lookup!
  }
`;

export const log = (
  message: string,
  fn: (...args: any[]) => {},
  debug?: boolean
) => {
  return (...args: any[]) => {
    console.log(message);
    if (debug) {
      console.log(message, args[0], args[1]);
    }
    return fn(...args);
  };
};

export const createRelation = (data: RelationData): Relation => ({
  _relationData: data,
});

export const resolvers: Resolvers = {
  Query: {
    search: () => ({
      id: (+new Date()).toString(),
    }),
    lookup: () => ({
      id: (+new Date()).toString(),
    }),
  },
};

export default buildSubgraphSchema({ typeDefs, resolvers });
