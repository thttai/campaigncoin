# campaigncoin
Kickstarter donate using smart contract

1. Using Chrome, go to chrome://extensions
2. Install MetaMask
3. Create a account on Rinkeby Test Network
4. Get some free ether for testing at https://faucet.rinkeby.io/
  + Make a tweet with your Ethereum address in public (you can delete it later)
  + Past the post url to page above and select "18.75 Ethers / 3 days"
5. You may need to create some accounts for admin, contributors and suppliers.
6. Go to https://campaigncoin.herokuapp.com
7. Create a campaign. Note: the account was used to create the campaign is admin account. And only admin account could make a withdraw requests and finalize requests.
8. You can using any account to view the campaign details and donate to the campaign, then become a contributor.
9. Whenever the admin want to withdraw amout of money, he must create a request, describe the destination account and purpose of that money.
10. The contributors review the open request and dicide to aprove or not.
11. If a request has approvals of half of number contributors, admin could finalize it and send money to the pre-define account.
