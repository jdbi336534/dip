const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
// var session = require('koa-session-minimal');
// var MysqlStore = require('koa-mysql-session');
var config = require('./config/default.js');

const index = require('./routes/index')
const users = require('./routes/users')
const loader = require('./routes/loaderconfig')
const exec = require('./routes/exec')

// error handler
onerror(app)
// session存储配置
// const sessionMysqlConfig = {
//   user: config.database.USERNAME,
//   password: config.database.PASSWORD,
//   database: config.database.DATABASE,
//   host: config.database.HOST,
// }

// // 配置session中间件
// app.use(session({
//   key: 'USER_SID',
//   store: new MysqlStore(sessionMysqlConfig)
// }))

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'html'
}))

// logger
app.use(async(ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
// error
app.use(async(ctx, next) => {
  try {
    await next();
  } catch (e) {
    let status = e.status || 500;
    let message = e.message || '服务器错误';
    ctx.body = {
      'code': status,
      'msg': message
    };
    if (status == 500) {
      // 触发 koa 统一错误事件，可以打印出详细的错误堆栈 log
      ctx.app.emit('error', e);
    }
    return;
  }
})
// routes
app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())
app.use(loader.routes(), loader.allowedMethods())
app.use(exec.routes(), exec.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app