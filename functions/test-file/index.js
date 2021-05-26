const tcb = require("@cloudbase/node-sdk");

// const app = tcb.init({
//   env: "hello-cloudbase-1gjrribi96ea328d"
// });

const app = tcb.init();

exports.main = async (event, context) => {
  const content = await app
  .downloadFile({
    fileID: "cloud://hello-cloudbase-1gjrribi96ea328d.6865-hello-cloudbase-1gjrribi96ea328d-1251036730/json/poet.song.1000.json"
  })
  .then((res) => {
    // fileContent 类型为 Buffer
    return JSON.parse(res.fileContent.toString('utf-8'));
  });
  return content;
}
