const Koa = require('koa');
const { PORT } = require('./config');
const ApolloServer = require('./graphql');


const app = new Koa();

ApolloServer.applyMiddleware({ app });

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
