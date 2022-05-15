"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coupon = void 0;
const util_crypto_1 = require("@polkadot/util-crypto");
const util_1 = require("@polkadot/util");
const utils_1 = require("./utils");
class Coupon {
    amount;
    pair;
    public;
    secret;
    constructor(secret, amount) {
        const pair = utils_1.keyring.addFromUri(secret);
        const publicKey = (0, util_1.u8aToHex)(pair.addressRaw);
        this.public = publicKey;
        this.secret = secret;
        this.amount = amount;
        this.pair = pair;
    }
    static generate(amount) {
        const randomSecret = (0, util_crypto_1.randomAsHex)(32);
        return new Coupon(randomSecret, amount);
    }
}
exports.Coupon = Coupon;
//# sourceMappingURL=coupon.js.map