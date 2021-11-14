import { ApolloServer } from 'apollo-server';
import { buildSubgraphSchema } from '@apollo/subgraph';

import rootSchema from './schema/root';
import spotifySchema from './schema/spotify';

const server = new ApolloServer({
  schema: buildSubgraphSchema([rootSchema, spotifySchema]),
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});