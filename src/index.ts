import { ApolloServer } from 'apollo-server';
import { buildSubgraphSchema } from '@apollo/subgraph';

import rootSchema from './schema/root';
import baseSchema from './packages/base';
import spotifySchema from './packages/spotify';

const server = new ApolloServer({
  schema: buildSubgraphSchema([rootSchema, baseSchema, spotifySchema]),
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
