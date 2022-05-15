import * as utilCrypto from "@polkadot/util-crypto";
import * as keyring from "@polkadot/keyring";
import * as util from "@polkadot/util";
import * as api from "@polkadot/api";
export * from "./contract";
export * from "./coupon";
export * from "./upload";
export * from "./utils";
export declare const polkadot: {
    utilCrypto: typeof utilCrypto;
    keyring: typeof keyring;
    util: typeof util;
    api: typeof api;
};
