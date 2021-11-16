import { gql } from 'apollo-server';

export const typeDefs = gql`
  scalar RelationInfo

  type Relation {
    info: RelationInfo
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
