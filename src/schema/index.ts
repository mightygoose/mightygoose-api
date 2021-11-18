import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    version: String
  }
`;

export const resolvers = {};

export default { typeDefs, resolvers };
