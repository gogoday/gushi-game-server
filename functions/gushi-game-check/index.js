

exports.main = async (event, context) => {

  console.log(context)

  return true ? {
    ret: 0,
  } : {
    ret: 1
  }
}
