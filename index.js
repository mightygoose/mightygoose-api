import Koa from 'koa';
import { init as initApolloServer } from './graphql';
import {PORT} from './config';

(async () => {

  const app = new Koa();

  await initApolloServer({ app });

  app.use(async ctx => {
    ctx.body = 'Hello World';
  });

  app.listen(PORT, () =>
    console.log(`
  server is running.
  app: http://localhost:${PORT}
  graphql: http://localhost:${PORT}/graphql
`),
  );
})();
