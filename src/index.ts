import { ApolloServer, gql } from 'apollo-server';

import {
  resolvers as rootResolvers,
  typeDefs as rootTypeDefs,
} from './schema/root';
import {
  resolvers as spotifyResolvers,
  typeDefs as spotifyTypeDefs,
} from './schema/spotify';

const typeDefs = [rootTypeDefs, spotifyTypeDefs];
const resolvers = [rootResolvers, spotifyResolvers];

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
