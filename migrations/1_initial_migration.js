var Migrations = artifacts.require("./Migrations.sol");
var helloworld = artifacts.require("./helloWorld.sol")

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(helloworld);
};
