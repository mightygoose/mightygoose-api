import { ApolloServer } from 'apollo-server';

import { dataSources, schema } from '.';

const server = new ApolloServer({
  schema,
  dataSources,
});

server.listen(4001).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
