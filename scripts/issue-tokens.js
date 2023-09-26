const decBank = artifacts.require('DecentralBank');

module.exports = async function (issueReward) {
	let dBank = await decBank.deployed();
	await dBank.issueTokens()
	console.log('tokens have been issued successfully');
	callback();
}