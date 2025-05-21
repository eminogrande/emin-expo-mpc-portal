API Quick Start
This quick start guide will get you up and running with the Portal MPC API.

Overview
The Enclave MPC API lives at mpc-client.portalhq.io. This API allows you create, backup, and recover Portal MPC Wallets. It also allows you to sign messages and transactions for EVM and Solana chains.

The Enclave MPC API at mpc-client.portalhq.io lets you create, backup, and recover Portal MPC wallets, and sign transactions for EVM and Solana chains. This guide gets you started quickly — see the Enclave MPC API Guide for details.

Authentication
Initialize the API with a Client API Key or Client Session Token via the Authorization: Bearer header. You can get a test Client API Key from the Portal Admin Dashboard in the Settings -> Test Client API Keys section. Simply click the New + button.


A modal will then be presented, allowing you to copy your test Client API Key. You can repeat this process as many times as you want to.

Create a wallet
Generate a wallet with the /v1/generate endpoint:

Copy
curl -X POST 'https://mpc-client.portalhq.io/v1/generate' \
    -H 'Content-type: application/json' \
    -H 'Authorization: Bearer <CLIENT_API_KEY|CLIENT_SESSION_TOKEN>' \
    -d '{}'
You’ll receive wallet shares for SECP256K1 (EVM) and ED25519 (Solana) curves. Example response:

Copy
{
  "SECP256K1": {
    "share": "eyJjbGllbnRJZCI6IiIsImJhY2t1cFNoYXJlUGFpcklkIjoiIiwic2lnbml...",
    "id": "clu3aue3j001fs60wdecyz0qy"
  },
  "ED25519": {
    "share": "zMzMzQ4MzIyMDUwMDYwMDc1NzU2NDYzMTU1MzEyODg3MzY5MjQxNTc2lnbml...",
    "id": "clu3auej6001ds60wqhh4tzgx"
  }
}
Confirm the shares are stored successfully
Next, store the generate response and confirm with Portal that you did so successfully with a PATCH request. Pass in the id values for each of the SECP256K1 and ED25519  objects.

In your production build, be sure to store the full response object in a secure location. For this guide, just save the shares off to the side.

Copy
curl -X PATCH 'https://api.portalhq.io/api/v3/clients/me/signing-share-pairs' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer <CLIENT_API_KEY|CLIENT_SESSION_TOKEN>' \
    -d '{
      "status": "STORED_CLIENT",
      "signingSharePairIds": ["<YOUR_SECP256K1_SHARE_ID>", "<YOUR_ED25519_SHARE_ID>"]
    }'
Great work! Your Portal client's wallet is now all set up to both receive and send tokens.

Retrieve your wallet's addresses
To view the addresses of your Portal client (along with many other details), simply make a request to the Get Client Details endpoint.

Copy
curl 'https://api.portalhq.io/api/v3/clients/me' \
    -H 'Authorization: Bearer <YOUR_TEST_CLIENT_API_KEY>'
Check out the Get Client Details API reference to learn about the other values that are returned, but for this guide we'll focus on the metadata.namespaces property, as allows you to easily access your wallet's addresses on various blockchains.

Example Response

Copy
{
  ...,
  "metadata": {
    "namespaces": {
      "bip122": {
        "address": "",
        "curve": "SECP256K1",
        "bitcoin": {
          "p2wpkh": {
            "mainnet": "bc1qpl54na90wlmdxj5z4wtz7cpp6p32dc9th54w0m",
            "testnet": "tb1qpl54na90wlmdxj5z4wtz7cpp6p32dc9tajwa5g"
          }
        }
      },
      "solana": {
        "address": "9JCnYR5kiBYGf3Csz5hLWab53n7ie8o6HaUdeVBUvPRq",
        "curve": "ED25519"
      },
      "stellar": {
        "address": "GB5ULMO2C3IWT5N5PFSBONB3WWRTNHKYCMJ53R2P4QXYRIVSVOJXBAST",
        "curve": "ED25519"
      },
      "eip155": {
        "address": "0x8257a8212a0ce84de8ffb951a42bba2a2a9ffce8",
        "curve": "SECP256K1"
      },
      "tron": {
        "address": "TMrPrVftxf1Yq8jwzrBER58LhfsiBZKhcX",
        "curve": "SECP256K1"
      }
    }
  }
}
Receive testnet tokens
Next, we'll fund your wallet with testnet tokens. We will use the Client API Fund Wallet endpoint for this to get some ETH on Ethereum Sepolia. If you need testnet tokens on other blockchains, we recommend checking out our Testnet Faucets doc.

Copy
curl --request POST \
  --url https://api.portalhq.io/api/v3/clients/me/fund \
  --header 'Authorization: Bearer <CLIENT_API_KEY|CLIENT_SESSION_TOKEN>' \
  --header 'Content-Type: application/json' \
  --data '{
	"chainId": "eip155:11155111",
	"token": "NATIVE",
	"amount": "0.01"
}'
Send tokens
Portal provides several ways to sign and submit transactions, but the simplest is to use the /v1/assets/send endpoint.

EVM
There are a few request body parameters you will need to provide for this request:

share

The /v1/generate's response's share property for the SECP256K1 object.

chain 

The pretty chain (ie. sepolia) or the CAIP-2 chain identifier.

token 

The token shorthand (ie. ETH or NATIVE) or the token address of the token you want to send.

to 

The destination address.

amount 

The amount of the token you want to send with decimals applied.

rpcUrl 

The RPC URL is the endpoint Portal uses to submit the transaction. Use Portal’s RPC URL to avoid signing up with a third-party provider.

Copy
curl -X POST 'https://mpc-client.portalhq.io/v1/assets/send' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <CLIENT_API_KEY|CLIENT_SESSION_TOKEN>' \
  -d '{
    "share": "<YOUR_SECP256K1_SHARE>",
    "chain": "sepolia",
    "token": "NATIVE",
    "to": "0xcae0d97d201ad54275b6e8a6b547c7611ad47963",
    "amount": "0.0001",
    "rpcUrl": "https://api.portalhq.io/rpc/v1/eip155/11155111"
  }'
The response of this request will include the transaction hash. You can search the transactionHash on sepolia.etherscan.io to view the transaction details.

Copy
{
  "transactionHash": "0x2ca7d87c9cb56965224faeeba22f15216ab480581db6902975cb0c494b58edf2",
  "metadata": {
    "amount": ".0001",
    "rawAmount": "100000000000000",
    "tokenDecimals": 18,
    "tokenSymbol": "ETH"
  }
}
If your Portal client is using Account Abstraction, then transactionHash is actually a User Operation hash. You can manually look up the user operation hash here.

Solana
Next, let's send tokens using Solana. The request will be very similar to the EVM request we just made, except that we need to use the ED25519 share from the generate response and solana-devnet as our chain.

You will need SOL to submit a Solana transaction, which is not currently supported by portal.receiveTestnetAsset. You can find a faucet to get test SOL tokens here.

Copy
curl -X POST 'https://mpc-client.portalhq.io/v1/assets/send' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <CLIENT_API_KEY|CLIENT_SESSION_TOKEN>' \
  -d '{
    "share": "<YOUR_ED25519_SHARE>",
    "chain": "solana-devnet",
    "token": "NATIVE",
    "to": "75ZfLXXsSpycDvHTQuHnGQuYgd2ihb6Bu4viiCCQ7P4H",
    "amount": "0.0001"
  }'
The response of this request will include the transaction hash. You can search the transactionHash on solscan.io?cluster=devnet to view the transaction details.

Copy
{
  "transactionHash": "4TDjz6rnYhKRMmdBBZNBxfEP9AVbd5dDt9m3aEQTJm3cioDFqtnDo7ZcZbs5xQc3vwCf4eAg9vxi1kD46th4wKxq",
  "metadata": {
    "amount": "0.0001",
    "lastValidBlockHeight": "336343025",
    "rawAmount": "100000",
    "tokenDecimals": 9,
    "tokenSymbol": "SOL"
  }
}
You just created a Portal client, created their wallet, accessed their addresses, received testnet tokens, and sent tokens on both Ethereum Sepolia and Solana Devnet! 🎉

Next we recommend going through the complete Enclave MPC API guide where we go into much more detail.