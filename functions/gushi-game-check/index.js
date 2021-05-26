const cloudbase = require('@cloudbase/node-sdk')

const app = cloudbase.init({})

// 1. 获取数据库引用
var db = app.database()

exports.getDataFromDb = async (dbIns, userId, create_time) => {
  const res = await dbIns.collection('gushi')
  .where({
    userId,
    create_time,
  })
  .get();
}

exports.main = async (event, context) => {
  if (!event.body) {
    return { ret: 2 }
  }
  console.log(event.body)
  const { userId, select, create_time } = JSON.parse(JSON.parse(event.body));
  if (!userId || !create_time || !select) {
    return { ret: 3}
  }
  const res = await this.getDataFromDb(db, userId, create_time);
  
  console.log(res);
  const data = res.data;
  if (!data) {
    return {
      ret: 5,
    }
  }
  const { deleteWolds } = data[0];
  for (let i = 0, l = deleteWolds.length; i < l; i++) {
    if (deleteWolds[i] !== select[i]) {
      return {
        ret: 4
      }
    }
  }

  return {
    ret: 0,
  }
}
