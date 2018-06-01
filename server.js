var express = require('express')
var Web3 = require('web3')
var cors = require('cors')
var app = express();
app.use(cors())

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/a', function (req, res) {
    console.log("I am in rest service")

    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"))
    var code = require('fs').readFileSync('./contracts/Helloworld.sol').toString()
    solc = require('solc')
    compiledCode = solc.compile(code)
    var getabi = compiledCode.contracts[':Helloworld'].interface
    console.log(getabi)
    abi = JSON.parse(getabi)
    var VotingContract = web3.eth.contract(abi);
    var byteCode = compiledCode.contracts[':Helloworld'].bytecode
    console.log(byteCode)
    deployedContract = VotingContract.new(8, { data: byteCode, from: web3.eth.accounts[0], gas: 4700000 }, function (e, contract) {
        if (!e) {
            if (!contract.address) {
                console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
            } else {
                console.log("Contract mined! Address: " + contract.address);
                console.log(contract);
                console.log("****************")
                console.log(deployedContract)

                var addr = deployedContract.address
                console.log("deployed address is "+addr)
                instance = VotingContract.at(addr)

                return res.json(deployedContract.sayHello.call())
            }
        } else {
            console.log(e);
        }
    })


})



app.listen(3000, function () {
    console.log("server started !!!!!!!!!")
});