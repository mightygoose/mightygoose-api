import { ApolloServer } from 'apollo-server';
import { buildSubgraphSchema } from '@apollo/subgraph';

import {
  resolvers as rootResolvers,
  typeDefs as rootTypeDefs,
} from './schema/root';
import {
  resolvers as spotifyResolvers,
  typeDefs as spotifyTypeDefs,
} from './schema/spotify';

const server = new ApolloServer({
  schema: buildSubgraphSchema([
    { typeDefs: rootTypeDefs, resolvers: rootResolvers },
    { typeDefs: spotifyTypeDefs, resolvers: spotifyResolvers },
  ]),
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
