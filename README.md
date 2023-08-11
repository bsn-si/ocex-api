## Disclaimer
> 💀 This is a **Work in Progress**.  
> Current status: Common PoC data storage and methods available. Partially tested.   
> **Use at your own risk**.

<h1 align="center">
    🎟️ ✨ OCEX API Client 🎁 👛
</h1>

OCEX smartcontract api for interaction with an OCEX smartcontract.

## Features
- For Owners
    - publish new instance of a contract to a blockchain
    - top-up balance of an instantiated contract
    - add new coupons
    - burn coupons
    - check spare funds on a smartcontract
    - withdraw spare funds
    - transfer ownership of a contract
- For Clients
    - activate a coupon
    - сheck a coupon

## Install && Usage

```
yarn add https://github.com/bsn-si/ocex-api
# or 
npm i --save https://github.com/bsn-si/ocex-api
```

Simple node usage

``` js
import { cryptoWaitReady } from "@polkadot/util-crypto"
import { ApiPromise, WsProvider } from "@polkadot/api"
import { Keyring } from "@polkadot/keyring"

// Import contract api class
import { Ocex } from "ocex-api"

async function main() {
  await cryptoWaitReady()
  
  const keyring = new Keyring({ type: "sr25519" })

  // Initialise the provider to connect to the local node
  const provider = new WsProvider("ws://127.0.0.1:9944")
  const client = await ApiPromise.create({ provider })

  // Common owner keys
  const signer = keyring.addFromUri("//Alice")
  console.log("Signer: ", signer.address)

  // Instance from exists contract address 
  const contract = await Ocex.fromAddress(client, signer, "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty")
  
  // Other actions..
}
```

For more detauls check out our [example](/examples/example.ts) of usage. For run example:

```
npm run run:example
```

### Coupon activation method
Now module doesn't have package on npm, and have dependency of wasm module. You need install package by your target & assign method to class instance.

#### NodeJS
``` bash
# Package for use from nodejs
yarn add https://gitpkg.now.sh/bsn-si/ocex-coupon-signature/pkg_node?main

# Package for use from web (with webpack)
yarn add https://gitpkg.now.sh/bsn-si/ocex-coupon-signature/pkg_web?main
```

And for initialization

``` js
// Import for nodejs
import { get_coupon_signature } from "ocex-coupon-signature-node"
// Import for web with webpack
import { get_coupon_signature } from "ocex-coupon-signature-web"

// ...

const contract = await Ocex.fromAddress(client, signer, "...")

// Setup method for create signature
contract.get_coupon_signature = get_coupon_signature
```

## Related repos
- OCEX [coupon activation dapp](https://github.com/bsn-si/ocex-activation)
- OCEX [Ink! smart contract](https://github.com/bsn-si/ocex-smartcontract)
- OCEX [CLI management tool](https://github.com/bsn-si/ocex-cli)
- JS/Wasm [library](https://github.com/bsn-si/ocex-coupon-signature) for coupon activation signatures

## License
[Apache License 2.0](https://github.com/bsn-si/ocex-api/blob/main/LICENSE) © Bela Supernova ([bsn.si](https://bsn.si))
