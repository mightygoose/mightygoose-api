import { gql } from 'apollo-server';
import { Relation, RelationData } from './types';

export const typeDefs = gql`
  enum Services {
    BASE
  }

  type RelationData {
    #service: Services!
    year: Int
    title: String
    artist: String
  }

  type Relation {
    _relationData: RelationData!
  }

  type Search {
    id: ID!
  }
`;

export const log = (message: string, fn: (...args: any[]) => {}) => {
  return (...args: any[]) => {
    console.log(message);
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
