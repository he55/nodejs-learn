import Koa from 'koa'

const app = new Koa()

app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(ctx => {
    ctx.body = 'Hello Koa'
})

app.listen(3000)
