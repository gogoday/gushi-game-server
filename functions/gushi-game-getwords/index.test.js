

const { expect } = require('chai');
const sinon = require('sinon')
const mySer = require('./index');

describe('main', () => {
  it('should get a right word', async () => {
    const event = { queryStringParameters: {userId: 'xxx'} };
    const result = await mySer.main(event);
    console.log(result)
    expect(result).to.include.keys('ret');
  })
})
