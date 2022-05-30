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

## Installation && Usage
This module doesn't have a package on NPM and is dependant from a wasm module. Use package locally. Before usage you need to setup modules and have an actual version of a `rust-lang` compiler installed. 

_Setup wasm crypto helper_

```
cd coupon-signature/
cargo install wasm-pack
wasm-pack build --target nodejs --release
```

_Setup Package_

Back to package root dir and install all dependencies with

```
npm install
# OR
yarn
```

Check out our [example](/examples/example.ts) of usage. For run example:

```
npm run run:example
```

## License
[Apache License 2.0](https://github.com/bsn-si/ocex-api/blob/main/LICENSE) © Bela Supernova ([bsn.si](https://bsn.si))
