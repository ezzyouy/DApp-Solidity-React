const Migr = artifacts.require("MigrationsS");

module.exports = function (deployer) {
	deployer.deploy(Migr)
}