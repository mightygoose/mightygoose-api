const Koa = require('koa');
const { PORT } = require('./config');


const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(PORT);
console.log(`server is running on port ${PORT}`);
