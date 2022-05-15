/// <reference types="node" />
import { AccountId } from "@polkadot/types/interfaces";
import { Contract } from "@polkadot/api-contract/base";
import { KeyringPair } from "@polkadot/keyring/types";
import { ApiBase } from "@polkadot/api/base";
import * as BN from "bn.js";
import { Coupon } from "./coupon";
export declare const CONTRACT_MULTIPLE_COUPONS_LIMIT = 5;
export declare enum ErrorCode {
    InvalidParseCouponSignature = "InvalidParseCouponSignature",
    ContractBalanceNotEnough = "ContractBalanceNotEnough",
    VerifySignatureFailed = "VerifySignatureFailed",
    CouponAlreadyBurned = "CouponAlreadyBurned",
    CouponAlreadyExists = "CouponAlreadyExists",
    InvalidParseCoupon = "InvalidParseCoupon",
    CouponNotFound = "CouponNotFound",
    TransferFailed = "TransferFailed",
    AccessOwner = "AccessOwner"
}
export interface CouponsResult {
    accepted: string[];
    declined: string[];
}
export declare class Ocex {
    #private;
    constructor(contract: Contract<"promise">, owner: KeyringPair);
    get address(): AccountId;
    get abi(): import("@polkadot/api-contract").Abi;
    contractBalance(): Promise<BN>;
    availableBalance(): Promise<BN>;
    fillBalance(amount: BN): Promise<BN>;
    addCoupon(coupon: Coupon): Promise<any>;
    addCoupons(coupons: Coupon[], amount: BN, limit?: number): Promise<CouponsResult>;
    checkCoupon(coupon: Coupon | string): Promise<[boolean, BN]>;
    activateCoupon(coupon: Coupon, receiver: string): Promise<any>;
    burnCoupons(coupons: Coupon[], limit?: number): Promise<CouponsResult>;
    paybackNotReservedFunds(): Promise<any>;
    static instantiateWithCode(api: ApiBase<"promise">, owner: KeyringPair, wasm: string | Uint8Array | Buffer): Promise<Ocex>;
    static fromAddress(api: ApiBase<"promise">, owner: KeyringPair, address: string | AccountId): Promise<Ocex>;
}
