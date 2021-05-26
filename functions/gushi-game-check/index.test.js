

const { expect } = require('chai');
const sinon = require('sinon')
const mySer = require('./index');

describe('main', () => {
  it('should get a right word', async () => {
    sinon.stub(mySer, 'getDataFromDb').callsFake(() => {
      return {
          "data":[
              {
                  "_id":"28ee4e3e60adc6431ca3031a42a33f86",
                  "author":"韋應物",
                  "create_time":1622001219148,
                  "deleteWolds":[
                      "少",
                      "京",
                      "歲",
                      "命"
                  ],
                  "paragraphs":[
                      "*年不遠仕",
                      "秉笏東西*",
                      "中*守淮郡",
                      "奉*乃征行"
                  ],
                  "title":"自尚書郎出爲滁州刺史",
                  "userId":"1621996039519-0.9863158576881599",
                  "wrongSort":[
                      "京",
                      "命",
                      "少",
                      "歲"
                  ]
              }
          ],
          "requestId":"68c6d937ae48f39767cc03c724fb90cb-179a6cf357c_1"
      }
    })
    const event = {
      body: "\"{\\\"select\\\":[\\\"少\\\",\\\"京\\\",\\\"歲\\\",\\\"命\\\"],\\\"userId\\\":\\\"1621996039519-0.9863158576881599\\\",\\\"create_time\\\":1621998250455}\""
    }
    const result = await mySer.main(event);
    console.log(result)
    expect(result.ret).to.be.equal(0);
    mySer.getDataFromDb.restore();
  })
})
