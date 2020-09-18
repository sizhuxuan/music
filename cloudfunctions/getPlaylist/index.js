// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

const rp = require('request-promise');

const URL = 'https://autumnfish.cn/personalized'

const playlistCollection = db.collection('playlist')
const MAX_LIMIT = 100

// 云函数入口函数
exports.main = async (event, context) => {

  // 获取数据库中的集合
  // const list = await playlistCollection.get()
  const countResult = await playlistCollection.count()
  const total = countResult.total
  const batchTimes = Math.ceil(total / MAX_LIMIT)
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    let promise = playlistCollection.skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }
  let list = {
    data: []
  }
  if (tasks.length > 0) {
    list = (await Promise.all(tasks)).reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data)
      }
    })
  }

  // 远程获取数据
  const playlist = await rp(URL)
    .then((res) => {
      return JSON.parse(res).result
    })
    .catch((err) => {
      return err
    });

  // 执行去重操作
  const newData = []
  for (let i = 0, len1 = playlist.length; i < len1; i++) {
    let flag = true
    for (let j = 0, len2 = list.data.length; j < len2; j++) {
      if (playlist[i].id === list.data[j].id) {
        flag = false
        break
      }
    }
    if (flag) {
      newData.push(playlist[i])
    }
  }

  // 只能单条插入，需要循环插入
  for (let i = 0, len = newData.length; i < len; i++) {
    await playlistCollection.add({
      data: {
        ...newData[i],
        createTime: db.serverDate()
      }
    }).then((res) => {
      console.log("插入成功")
    }).catch((err) => {
      console.log("插入失败")
    })
  }
  return newData.length
}