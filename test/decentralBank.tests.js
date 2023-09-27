const Teth = artifacts.require('Tether')
const DecBank = artifacts.require('DecentralBank')
const RWD = artifacts.require('RWD')

require('chai').use(require('chai-as-promised')).should()

contract('DecentralBank', ([owner, customer]) => {
  let tether, rwd, dBank

  function tokens (number) {
    return web3.utils.toWei(number, 'ether')
  }
  before(async () => {
    tether = await Teth.new()
    rwd = await RWD.new()
    dBank = await DecBank.new(rwd.address, tether.address)

    await rwd.transfer(dBank.address, tokens('1000000'))
    await tether.transfer(customer, tokens('100'), { from: owner })
  })
  describe('Mock Tether Token', async () => {
    it('matches name successfully', async () => {
      const name = await tether.name()
      assert.equal(name, 'Mock Tether Token')
    })
  })

  describe('Reward Token', async () => {
    it('matches name successfully', async () => {
      const name = await rwd.name()
      assert.equal(name, 'Reward Token')
    })
  })

  describe('Decentral Bank', async () => {
    it('matches name successfully', async () => {
      const name = await dBank.name()
      assert.equal(name, 'Decentral Bank')
    })
    it('contract has token', async () => {
      let balance = await rwd.balanceOf(dBank.address)
      assert.equal(balance, tokens('1000000'))
    })
  })

  describe('Yield Farming', async () => {
    it('rewards tokens for staking', async () => {
      let result

      result = await tether.balanceOf(customer)
      assert.equal(
        result.toString(),
        tokens('100'),
        'customer mock wallet balance before staking'
      )
      await tether.approve(dBank.address, tokens('100'), { from: customer })
      await dBank.depositToken(tokens('100'), { from: customer })

      result = await tether.balanceOf(customer)
      assert.equal(
        result.toString(),
        tokens('0'),
        'customer mock wallet balance after staking 100 tokens'
      )

      result = await tether.balanceOf(dBank.address)
      assert.equal(
        result.toString(),
        tokens('100'),
        'decentral bank mock wallet balance after staking from customer'
      )

      result = await dBank.balanceOf(customer)
      assert.equal(
        result.toString(),
        'true',
        'customer is staking status after staking'
      )

      await dBank.issueTokens({ from: owner })
      await dBank.issueTokens({ from: customer }).should.be.rejected

      await dBank.unstakeTokens({ from: customer })

      result = await tether.balanceOf(customer)
      assert.equal(
        result.toString(),
        tokens('0'),
        'customer mock wallet balance after staking 100 tokens'
      )

      result = await tether.balanceOf(dBank.address)
      assert.equal(
        result.toString(),
        tokens('100'),
        'decentral bank mock wallet balance after staking from customer'
      )

      result = await dBank.balanceOf(customer)
      assert.equal(
        result.toString(),
        'false',
        'customer is no long staking after staking'
      )
    })
  })
})
