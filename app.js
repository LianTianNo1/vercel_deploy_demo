const Koa = require('koa')
const cors = require('@koa/cors')
const chatRouter = require('./routes/chat')
const Router = require('koa-router')
const { koaBody } = require('koa-body')
const session = require('koa-session')
const RedisStore = require('koa-redis')

const staticDir = require('koa-static')
const log4js = require('./utils/log4js')

const router = new Router()
const app = new Koa()

// app.use(
//     cors({
//         credentials: true, // 允许跨域请求携带cookie等凭证信息
//     })
// )

// 设置静态文件路径
// app.use(static(__dirname + '/public'))
app.use(staticDir('public'))

app.keys = ['chat:lang'] // 设置session的密钥

// 配置session
const sessionConfig = {
    key: 'chat:lang', // cookie key (default is koa:sess)
    maxAge: 86400000, // cookie的过期时间 maxAge in ms (default is 1 days)
    overwrite: true, // 是否可以overwrite    (默认default true)
    httpOnly: true, // cookie是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true, // 签名默认true
    sameSite: 'Lax', // 设置为none表示允许跨域请求携带cookie等凭证信息
    // secure: false, // 设置为true表示只有https请求才能携带cookie等凭证信息
    store: new RedisStore({
        host: 'localhost',
        port: 6379,
        db: 0,
        // password: 'your-redis-password'
    }),
}

// 注册session中间件
app.use(session(sessionConfig, app))

app.use(koaBody())

app.use(async (ctx, next) => {
    log4js.info('[url]--->', ctx.request.url)
    log4js.info('[session.messages]--->', ctx.session.messages)
    await next()
})

app.use(chatRouter.routes())
app.use(router.allowedMethods())

app.listen(3013, () => {
    console.log('App listening on port 3013')
})

module.exports = app.callback()
