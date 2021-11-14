import { ApolloServer } from 'apollo-server';
import { buildSubgraphSchema } from '@apollo/subgraph';

import rootSchema from './schema';
import baseSchema from './packages/base';
import spotifySchema from './packages/spotify';
import discogsSchema from './packages/discogs';

const server = new ApolloServer({
  schema: buildSubgraphSchema([
    rootSchema,
    baseSchema,
    spotifySchema,
    discogsSchema,
  ]),
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
