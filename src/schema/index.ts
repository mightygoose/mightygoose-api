import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    search: Search
  }
`;

export const resolvers = {
  Query: {
    search: () => ({}),
  },
};

export default { typeDefs, resolvers };
