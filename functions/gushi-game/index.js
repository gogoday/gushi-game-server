
const https = require('https');

Array.prototype.shuffle = function() {
  var array = this;
  var m = array.length,
      t, i;
  while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
  }
  return array;
}

const numMap = {
  song: [0, 254],
  tang: [0, 57],
};

const typeMap = ['song', 'tang'];

function getRandomUrl() {
  const type = typeMap[(Math.random() * 10 > 5) ? 1 : 0];
  const range = numMap[type];
  const index = Math.round(Math.random() * range[1])
  return `https://raw.githubusercontent.com/gogoday/chinese-poetry/master/json/poet.${type}.${index}000.json`
}

async function getDataFromUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = ''
      res.on('data', chunk => {
        data += chunk.toString('utf8');
      })
      res.on('end', () => {
        // console.log(data)
        resolve(JSON.parse(data));
      })
    }).on('error', (e) => {
      reject(e);
    })
  })
}

exports.getARandomWordFromArrayList = (arr) => {
  return arr[Math.floor( Math.random() * arr.length )];
}

function handleWorld(words) {
  words.paragraphs.splice(2);
  if (words.paragraphs.length < 2) {
    return false;
  }
  const deleteWolds = [];
  words.paragraphs = words.paragraphs.reduce((arr, item) => {
    
    // 按，拆成单句
    const childWorlds = item.split('，');
    childWorlds.forEach(childWorld => {
      childWorld = childWorld.replace('。', '');
      const deleteIndex = Math.round(Math.random() * (childWorld.length - 1));
      const deleteWorld = childWorld.slice(deleteIndex, deleteIndex + 1);
      deleteWolds.push(deleteWorld);
      arr.push(childWorld.replace(deleteWorld, '*'));
    })
    return arr;
  }, [])

  let length = 0;
  for (let i = 0, l = words.paragraphs.length; i < l; i++) {
    const item = words.paragraphs[i];
    // console.log(`length: ${length}, item.length: ${item.length}`)
    if (length === 0) {
      length = item.length;
    } else if (length != item.length) {
      return false;
    }
  }

  words.deleteWolds = deleteWolds.slice();
  words.wrongSort = deleteWolds.shuffle();

  delete words.id;

  // 增加一些混淆的字
  return true;
}



exports.main = async () => {

  const url = getRandomUrl();
  const result = await getDataFromUrl(url);
  const words = this.getARandomWordFromArrayList(result);
  const handleResult = handleWorld(words);
  return handleResult ? {
    ret: 0,
    data: words
  } : {
    ret: 1
  }
}
