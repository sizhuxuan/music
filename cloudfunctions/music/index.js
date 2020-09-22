// 云函数入口文件
const cloud = require('wx-server-sdk')

// 引入tcb-router
const TcbRouter = require('tcb-router')

// 引入request
const rp = require('request-promise')

const BASE_URL = 'https://autumnfish.cn'

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

  const app = new TcbRouter({
    event
  })

  app.router('playlist', async (ctx, next) => {
    ctx.body = await cloud.database().collection('playlist')
      .skip(event.start)
      .limit(event.count)
      .orderBy("createTime", "desc")
      .get()
      .then((res) => {
        return res
      })
  })

  app.router('musiclist', async (ctx, next) => {
    ctx.body = await rp(BASE_URL + '/playlist/detail?id=' + parseInt(event.playlistId)).then((res) => {
      return JSON.parse(res)
    })
  })

  app.router('musicUrl', async (ctx, next) => {
    ctx.body = await rp(BASE_URL + '/song/url?id=' + parseInt(event.musicId)).then((res) => {
      return JSON.parse(res)
    })
  })

  app.router('musicUrl', async (ctx, next) => {
    ctx.body = await rp(BASE_URL + '/song/url?id=' + parseInt(event.musicId)).then((res) => {
      return JSON.parse(res)
    })
  })

  app.router('lyric', async (ctx, next) => {
    console.log(BASE_URL + '/lyric?id=' + parseInt(event.musicId))
    ctx.body = await rp(BASE_URL + '/lyric?id=' + parseInt(event.musicId)).then((res) => {
      console.log("lyric:",res)
      return JSON.parse(res)
    })
  })

  return app.serve()
}