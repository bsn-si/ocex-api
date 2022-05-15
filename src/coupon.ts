import { KeyringPair } from "@polkadot/keyring/types"
import { randomAsHex } from "@polkadot/util-crypto"
import { u8aToHex } from "@polkadot/util"
import * as BN from "bn.js"

import { keyring } from "./utils"

export class Coupon {
  amount: BN | undefined
  pair: KeyringPair
  public: string
  secret: string

  constructor(secret: string, amount?: BN) {
    const pair = keyring.addFromUri(secret)
    const publicKey = u8aToHex(pair.addressRaw)

    this.public = publicKey
    this.secret = secret
    this.amount = amount
    this.pair = pair
  }

  static generate(amount: BN) {
    const randomSecret = randomAsHex(32)
    return new Coupon(randomSecret, amount)
  }
}
