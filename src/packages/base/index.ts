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
    artists: String
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
  Search: {
    id: () => +new Date(),
  },
};

export default { typeDefs, resolvers };
