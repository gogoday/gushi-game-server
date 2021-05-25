

const { expect } = require('chai');
const sinon = require('sinon')
const mySer = require('./index');



describe('main', () => {
  it('should get a right word', async () => {
    const result = await mySer.main();
    console.log(result)
    expect(result).to.include.keys('ret');
  })
})
