const Teth = artifacts.require('Tether')
const DecBank = artifacts.require('DecentralBank')
const RWD = artifacts.require('RWD')

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(Teth)
  const tether = await Teth.deployed()

  await deployer.deploy(RWD)
  const rwd = await RWD.deployed()

  await deployer.deploy(DecBank, rwd.address, tether.address)
  const dBank = await DecBank.deployed()

  await rwd.transfer(dBank.address, '1000000000000000000000000')
  await tether.transfer(accounts[1], '1000000000000000000')
}
