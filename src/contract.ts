import { AccountId, Address } from "@polkadot/types/interfaces"
import { get_coupon_signature } from "ocex-coupon-signature"
import { ISubmittableResult } from "@polkadot/types/types"
import { Contract } from "@polkadot/api-contract/base"
import { KeyringPair } from "@polkadot/keyring/types"
import { toPromiseMethod } from "@polkadot/api"
import { ApiBase } from "@polkadot/api/base"
import * as BN from "bn.js"

import { execContractCallWithResult, waitExtrinsic } from "./utils"
import { CONTRACT_ABI, uploadContract } from "./upload"
import { Coupon } from "./coupon"

// prettier-ignore
async function getBalance(api: ApiBase<"promise">, address: AccountId | string): Promise<BN> {
  const { data: { free } } = await api.query.system.account(address) as any
  return free
}

export enum ErrorCode {
  InvalidParseCouponSignature = "InvalidParseCouponSignature",
  ContractBalanceNotEnough = "ContractBalanceNotEnough",
  VerifySignatureFailed = "VerifySignatureFailed",
  CouponAlreadyBurned = "CouponAlreadyBurned",
  CouponAlreadyExists = "CouponAlreadyExists",
  InvalidParseCoupon = "InvalidParseCoupon",
  CouponNotFound = "CouponNotFound",
  TransferFailed = "TransferFailed",
  AccessOwner = "AccessOwner",
}

export interface CouponsResult {
  accepted: string[]
  declined: string[]
}

export class Ocex {
  // Base contract api class
  #contract: Contract<"promise">
  // owner is owner of contract
  #owner: KeyringPair

  constructor(contract: Contract<"promise">, owner: KeyringPair) {
    this.#contract = contract
    this.#owner = owner
  }

  get address() {
    return this.#contract.address
  }

  get abi() {
    return this.#contract.abi
  }

  // Contract balance (total)
  public async contractBalance(): Promise<BN> {
    return getBalance(this.#contract.api, this.#contract.address)
  }

  // Contract spare funds
  public async availableBalance(): Promise<BN> {
    const query = await this.#contract.query.availableBalance(this.#owner.address, {
      gasLimit: -1,
    })

    const data: any = query.output.toJSON()
    return new BN(data)
  }

  // fill contract balance from owner funds
  public async fillBalance(amount: BN): Promise<BN> {
    const api = this.#contract.api

    const transfer = api.tx.balances.transfer(this.#contract.address, amount)
    const ownerBalance = await getBalance(api, this.#owner.address)
    const info = await transfer.paymentInfo(this.#owner)
    const fundsNotEnough = ownerBalance.lt(amount.add(info.partialFee))

    if (fundsNotEnough) {
      throw new Error("owner balance not enough for transaction")
    }

    await waitExtrinsic(api, transfer, this.#owner)
    return this.contractBalance()
  }

  // Set new `coupon` with declared amount.
  public async addCoupon(coupon: Coupon) {
    return execContractCallWithResult(
      this.#contract,
      this.#owner,
      "addCoupon",
      coupon.public,
      coupon.amount,
    )
  }

  // Set array `max N items` of `coupon` with declared per key.
  public async addCoupons(coupons: Coupon[], amount: BN, limit = 5): Promise<CouponsResult> {
    if (coupons.length > limit) {
      throw new Error(`Max ${limit} coupons can be added with this method`)
    }

    const $coupons = coupons.map(coupon => coupon.public)

    const result: CouponsResult = await execContractCallWithResult(
      this.#contract,
      this.#owner,
      "addCoupons",
      $coupons,
      amount,
    )

    result.accepted = result.accepted.filter(v => !!v)
    result.declined = result.declined.filter(v => !!v)

    return result
  }

  // Verification that the coupon is registered and it's value
  public async checkCoupon(coupon: Coupon | string): Promise<[boolean, BN]> {
    const publicKey = typeof coupon === "string" ? coupon : coupon.public

    const query = await this.#contract.query.checkCoupon(
      this.#owner.address,
      { gasLimit: -1 },
      publicKey,
    )

    const data = query.output.toJSON()
    return [data[0], new BN(data[1])]
  }

  // Activate `coupon` with transfer of appropriate liquidity to a receiver's address.
  public async activateCoupon(coupon: Coupon, receiver: string) {
    const signature = get_coupon_signature(this.#contract.address.toHex(), receiver, coupon.secret)

    return execContractCallWithResult(
      this.#contract,
      this.#owner,
      "activateCoupon",
      receiver,
      coupon.public,
      signature,
    )
  }

  // Method for disabling and burning registered (but not redeemed) coupons.
  public async burnCoupons(coupons: Coupon[], limit = 5) {
    if (coupons.length > limit) {
      throw new Error(`Max ${limit} coupons can be added with this method`)
    }

    const $coupons = coupons.map(coupon => coupon.public)

    const result: CouponsResult = await execContractCallWithResult(
      this.#contract,
      this.#owner,
      "burnCoupons",
      $coupons,
    )

    result.accepted = result.accepted.filter(v => !!v)
    result.declined = result.declined.filter(v => !!v)

    return result
  }

  // Method for transferring spare balance (not reserved for coupons)
  public async paybackNotReservedFunds() {
    return execContractCallWithResult(this.#contract, this.#owner, "paybackNotReservedFunds")
  }

  // Create contract helper class instance from scratch
  static async instantiateWithCode(
    api: ApiBase<"promise">,
    owner: KeyringPair,
    wasm: string | Uint8Array | Buffer,
  ) {
    const contract = await uploadContract(api, owner, wasm)
    return new Ocex(contract, owner)
  }

  // Create contract helper class instance from known address
  static async fromAddress(
    api: ApiBase<"promise">,
    owner: KeyringPair,
    address: string | AccountId,
  ) {
    const contract = new Contract(api, CONTRACT_ABI, address, toPromiseMethod)
    return new Ocex(contract, owner)
  }
}
