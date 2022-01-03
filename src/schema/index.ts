import { gql } from 'apollo-server';
import { buildSubgraphSchema } from '@apollo/subgraph';

export const typeDefs = gql`
  type Query {
    version: String
  }
`;

export const resolvers = {};

export default buildSubgraphSchema({ typeDefs, resolvers });
