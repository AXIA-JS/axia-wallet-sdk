# 🔴WARNING: Beta Release🔴

-   This library is under development and there might be frequent breaking changes.
-   Audit pending.

# AXIA wallet SDK (Beta)

AXIA wallet SDK is a typescript library for creating and managing decentralized wallets.

It provides high level methods to transact on Axia's primary networks: Swap, Core and AX.

Wallet types supported:

-   Singleton Wallets
-   Ledger Wallets
-   Mnemonic Wallets
-   Public Mnemonic Wallets (XPUB)

Using the axia-wallet-sdk developers can:

-   Receive and send tokens and NFTs.
-   Cross chain transfer
-   Validation & Delegation
-   Create keystore files from wallet instances
-   Get transaction history of wallets
-   Mint NFTs on the SwapChain

## Installation

With npm

`npm install --save @zee-ava/axia-wallet-sdk`

or yarn

`yarn add @zee-ava/axia-wallet-sdk`

## Local build

1. Clone the repository.
2. Install dependencies `yarn install`
3. Run for development `yarn start`

## Webpack

For Webpack version 5 and above you must use this plugin with it. https://www.npmjs.com/package/node-polyfill-webpack-plugin
