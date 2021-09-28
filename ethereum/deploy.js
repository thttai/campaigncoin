// deploy code will go here
const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./build/CampaignFactory.json')

const provider = new HDWalletProvider(
    'dice pitch feature baby crumble health urge secret sadness exotic bullet rifle',
    'https://rinkeby.infura.io/v3/dd795ba7df814e2fb110fb6a0b465ee7'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attemping to deploy from account', accounts[0])

    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: []})
    .send({ gas: '1000000', from: accounts[0] });

    console.log(interface);
    console.log('Contract deployed to', result.options.address)
}
deploy()