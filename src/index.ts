import * as utilCrypto from "@polkadot/util-crypto"
import * as keyring from "@polkadot/keyring"
import * as util from "@polkadot/util"
import * as api from "@polkadot/api"

export * from "./contract"
export * from "./coupon"
export * from "./upload"
export * from "./utils"

// Re-exports base polkadot packages for fix esm duplicate issue
// https://github.com/polkadot-js/api/issues/4315
export const polkadot = {
  utilCrypto,
  keyring,
  util,
  api,
}
