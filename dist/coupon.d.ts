import { KeyringPair } from "@polkadot/keyring/types";
import * as BN from "bn.js";
export declare class Coupon {
    amount: BN | undefined;
    pair: KeyringPair;
    public: string;
    secret: string;
    constructor(secret: string, amount?: BN);
    static generate(amount: BN): Coupon;
}
