import Web3 from "web3";

var web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    // we are in the browser and metamask is running.
    window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);
} else {
    // We are on server or the user is not running metamask.
    const provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/dd795ba7df814e2fb110fb6a0b465ee7');
    web3 = new Web3(provider);
}
 
export default web3;