

exports.main = async (event, context) => {
  const { body } = event;
  const selectWords = JSON.parse(body);
  console.log(selectWords);
  // 读数据库 校验数据

  return true ? {
    ret: 0,
  } : {
    ret: 1
  }
}
