import Koa from 'koa';
import ApolloServer from './graphql';
import { PORT } from './config';


const app = new Koa();

ApolloServer.applyMiddleware({ app });

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(PORT, () => console.log(`
  server is running.
  app: http://localhost:${PORT}
  graphql: http://localhost:${PORT}/graphql
`));
