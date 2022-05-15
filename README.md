> 💀 This is a **Work in Progress**.  
> Current status: Common PoC data storage and methods available. Partially tested.   
> **Use at your own risk**.

<h1 align="center">
    🎟️ ✨ OCEX API Client 🎁 👛
</h1>

OCEX smartcontract api for interact with smartcontract.

## Features
- For Owners
    - Can publish new instance of contract to blockchain
    - Can fill balance of instantiated contract
    - Add new coupons
    - Burn coupons
    - Check spare funds on smartcontract
    - Payback spare funds
    - Transfer ownership
- For Clients
    - Activate coupon
    - Check coupon

## Install && Usage
Now module doesn't have package on npm, and have dependency of wasm module. Use package locally. Before usage you need setup modules. And also have installed actual version `rust-lang` compiler. 

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
[Apache License 2.0](https://choosealicense.com/licenses/apache-2.0/) © Bela Supernova ([bsn.si](https://bsn.si))
