// 云函数入口文件
const cloud = require('wx-server-sdk')

// 云函数的 index.js
const TcbRouter = require('tcb-router');

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({
    event
  });

  // app.use 表示该中间件会适用于所有的路由
  app.use(async (ctx, next) => {
    console.log("进去全局中间件")
    ctx.data = {};
    ctx.data.openId = event.userInfo.openId
    await next(); // 执行下一中间件
    console.log("离开全局中间件")
  });

  app.router("music", async (ctx, next) => {
      console.log("进入电影名称中间件")
      ctx.data.musicName = "数鸭子"
      await next() // 执行下一中间件
      console.log("离开电影名称中间件")
    },
    async (ctx, next) => {
      console.log("进入电影类型中间件")
      ctx.data.musicType = "儿歌"
      ctx.body = {
        data: ctx.data
      }
      console.log("离开电影类型中间件")
    })

  app.router("movie", async (ctx, next) => {
      ctx.data.musicName = "千与千寻"
      await next() // 执行下一中间件
    },
    async (ctx, next) => {
      ctx.data.musicType = "日本动画片"
      ctx.body = {
        data: ctx.data
      }
    })

  return app.serve()
}