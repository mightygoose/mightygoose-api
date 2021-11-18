import { gql } from 'apollo-server';
import { Relation, RelationData } from './types';

export const typeDefs = gql`
  enum Services {
    BASE
  }

  type RelationData {
    #service: Services!
    type: String
    title: String
    album: String
    artist: String
    artists: [String!]
    year: Int
    country: String
    genre: [String!]
  }

  type Relation {
    _relationData: RelationData!
  }

  type Search {
    id: ID!
  }

  type Lookup {
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

export const resolvers = {
  Query: {
    search: () => ({}),
    lookup: () => ({}),
  },
  Search: {
    id: () => +new Date(),
  },
  Lookup: {
    id: () => +new Date(),
  },
};

export default { typeDefs, resolvers };
