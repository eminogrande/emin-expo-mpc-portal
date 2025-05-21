SDK Quick Start
This quick start guide will get you up and running with any of the Portal SDKs.

Overview
Portal offers SDKs for Web, iOS, Android, and React Native. To install the chosen Portal SDK in your app, simply add the Portal package to your project.

Web
iOS
Android
React Native
The basic Portal setup consists of three packages:

@portal-hq/core - The core Portal library.

@portal-hq/keychain - An adapter for storing MPC signing shares on-device.

@portal-hq/gdrive-storage - An adapter for storing MPC backup shares off-device.

These modules allow you to initialize Portal in your app.

Copy
yarn add @portal-hq/core @portal-hq/keychain @portal-hq/gdrive-storage
Authentication
The Portal SDK is initialized with a Client API Key or Client Session Token. You can get a test Client API Key from the Portal Admin Dashboard in the Settings -> Test Client API Keys section. Simply click the New + button.


A modal will then be presented, allowing you to copy your test Client API Key. You can repeat this process as many times as you need to.

Initializing Portal
To initialize Portal in your application, create a new instance of the Portal class included in the package dependency you added. You can provide your new test Client API Key as the apiKey argument during initialization. rpcConfig is a map of CAIP-2 Chain IDs to their respective RPC URLs.

Portal offers custom approval flows during the signing process, but for now, we can auto-approve all signatures with the autoApprove argument.

Web
iOS
Android
React Native
Copy
import Portal from '@portal-hq/core'

const portal = new Portal({
    apiKey: 'YOUR_TEST_CLIENT_API_KEY',
    autoApprove: true,
    gatewayConfig: {
      ['eip155:1']: 'https://api.portalhq.io/rpc/v1/eip155/1',
      ['eip155:11155111']: 'https://api.portalhq.io/rpc/v1/eip155/11155111',
      ['solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp']: 'https://api.portalhq.io/rpc/v1/solana/5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
      ['solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1']: 'https://api.portalhq.io/rpc/v1/solana/EtWTRABZaYq6iMfeYKouRu166VU2xqa1',
    },
})
Create a wallet
To create a new wallet, use the portal.createWallet() function. You can optionally provide a callback to receive status updates during wallet creation.

Web
iOS
Android
React Native
Copy
const addresses = await portal.createWallet()

console.log(`My Portal EVM address: ${addresses.eip155}`)
console.log(`My Portal Solana address: ${addresses.solana}`)
Receive testnet tokens
Now that you have a wallet, the next step is to get test tokens for it. You can fund your wallet using portal.receiveTestnetAsset. If you are looking for a greater variety of test tokens, we recommend exploring our faucets page.

The chainId will need to be a CAIP-2 compliant Chain ID. For more info on Chain ID formatting, see this doc.

Web
iOS
Android
React Native
Copy
const chainId = "eip155:11155111" // Ethereum Sepolia

const params = {
  amount: "0.01", // You will receive 0.01 ETH
  token: "NATIVE" // Token, use "NATIVE" for the chain's native token
}

// Fund your Portal wallet
const response = await portal.receiveTestnetAsset(chainId, params)

console.log("✅ Transaction hash: ${response.data.txHash}")
Send tokens
Portal provides two ways to send transactions:

portal.sendAsset() - A simple method for sending tokens from your Portal wallet.

portal.request() - Direct access to the underlying web3 provider for custom transactions. (You can learn more about this method here.)

For most use cases, we recommend using portal.sendAsset() as shown in the examples below.

EVM
Web
iOS
Android
React Native
Copy
const chainId = "eip155:11155111" // Ethereum Sepolia

const params = {
  amount: "0.0001", // Sends 0.0001 ETH
  to: "0xDestinationAddress", // The recipient address
  token: "NATIVE" // Token, use "NATIVE" for the chain's native token
}

// Send the tokens
const txHash = await portal.sendAsset(params.to, params.token, params.amount, chainId)

console.log(`✅ Transaction hash: ${txHash}`)
If your Portal client is using Account Abstraction, then txHash is actually a User Operation hash. You can manually look up the user operation hash here.

Solana
You will need SOL to submit a Solana transaction, which is not currently supported by portal.receiveTestnetAsset. You can find a faucet to get test SOL tokens here.

Web
iOS
Android
React Native
Copy
const chainId = "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1"; // Solana Devnet

const params = {
  amount: "0.0001", // Sends 0.0001 SOL
  to: "0xDestinationAddress", // The recipient address
  token: "NATIVE" // Token, use "NATIVE" for the chain's native token
}

// Send the tokens
const txHash = await portal.sendAsset(params.to, params.token, params.amount, chainId)

console.log(`✅ Transaction hash: ${txHash}`)
You just created a Portal client, created their wallet, accessed their addresses, received testnet tokens, and sent tokens on both Ethereum Sepolia and Solana Devnet! 🎉

Next we recommend going through the complete SDK guides where we go into much more detail.