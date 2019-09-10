const {  ApolloServer, gql } = require('apollo-server-koa');
const { mergeSchemas } = require('graphql-tools');
const { version } = require('../package');

// Construct a schema, using GraphQL schema language
const appTypeDefs = gql`
  type Query {
    version: String
  }
`;

// Provide resolver functions for your schema fields
const appResolvers = {
  Query: {
    version: () => version,
  },
};

const server = new ApolloServer({
  typeDefs: [appTypeDefs],
  resolvers: [appResolvers],
});

module.exports = server;
