import { gql } from 'apollo-server';

export const typeDefs = gql`
  enum Services {
    BASE
  }

  type RelationData {
    service: Services!
    year: Int
    title: String
    artist: String
  }

  type Relation {
    id: ID!
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

export const resolvers = {
  Search: {
    id: () => +new Date(),
  },
};

export default { typeDefs, resolvers };
