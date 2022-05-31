// Re-exports base polkadot packages for fix esm duplicate issue
// https://github.com/polkadot-js/api/issues/4315

import { decodePair } from "@polkadot/keyring/pair/decode"
import * as utilCrypto from "@polkadot/util-crypto"
import * as keyring from "@polkadot/keyring"
export * from "@polkadot/keyring/types"
import * as util from "@polkadot/util"
import * as api from "@polkadot/api"

export {
  decodePair,
  utilCrypto,
  keyring,
  util,
  api,
}
