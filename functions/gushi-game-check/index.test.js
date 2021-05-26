

const { expect } = require('chai');
const sinon = require('sinon')
const mySer = require('./index');

describe('main', () => {
  it('should get a right word', async () => {
    const event = {
      body: JSON.stringify({"select":["入","至","光","坐"],"userId":"1621996039519-0.9863158576881599","create_time":1621998250455})
    }
    const result = await mySer.main(event);
    console.log(result)
    expect(result).to.include.keys('ret');
  })
})
