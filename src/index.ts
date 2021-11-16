import { ApolloServer } from 'apollo-server';
import { buildSubgraphSchema } from '@apollo/subgraph';

import rootSchema from './schema';
import baseSchema from './packages/base';
// import spotifySchema from './packages/spotify';
import discogsSchema, {
  dataSources as discogsDataSources,
} from './packages/discogs';

const server = new ApolloServer({
  schema: buildSubgraphSchema([
    rootSchema,
    baseSchema,
    // spotifySchema,
    ...discogsSchema,
  ]),
  dataSources: () => ({
    ...discogsDataSources,
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
