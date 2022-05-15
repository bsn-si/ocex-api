"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ocex = exports.ErrorCode = void 0;
const ocex_coupon_signature_1 = require("ocex-coupon-signature");
const base_1 = require("@polkadot/api-contract/base");
const api_1 = require("@polkadot/api");
const BN = require("bn.js");
const utils_1 = require("./utils");
const upload_1 = require("./upload");
// prettier-ignore
async function getBalance(api, address) {
    const { data: { free } } = await api.query.system.account(address);
    return free;
}
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["InvalidParseCouponSignature"] = "InvalidParseCouponSignature";
    ErrorCode["ContractBalanceNotEnough"] = "ContractBalanceNotEnough";
    ErrorCode["VerifySignatureFailed"] = "VerifySignatureFailed";
    ErrorCode["CouponAlreadyBurned"] = "CouponAlreadyBurned";
    ErrorCode["CouponAlreadyExists"] = "CouponAlreadyExists";
    ErrorCode["InvalidParseCoupon"] = "InvalidParseCoupon";
    ErrorCode["CouponNotFound"] = "CouponNotFound";
    ErrorCode["TransferFailed"] = "TransferFailed";
    ErrorCode["AccessOwner"] = "AccessOwner";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
class Ocex {
    // Base contract api class
    #contract;
    // owner is owner of contract
    #owner;
    constructor(contract, owner) {
        this.#contract = contract;
        this.#owner = owner;
    }
    get address() {
        return this.#contract.address;
    }
    get abi() {
        return this.#contract.abi;
    }
    // Contract balance (total)
    async contractBalance() {
        return getBalance(this.#contract.api, this.#contract.address);
    }
    // Contract spare funds
    async availableBalance() {
        const query = await this.#contract.query.availableBalance(this.#owner.address, {
            gasLimit: -1,
        });
        const data = query.output.toJSON();
        return new BN(data);
    }
    // fill contract balance from owner funds
    async fillBalance(amount) {
        const api = this.#contract.api;
        const transfer = api.tx.balances.transfer(this.#contract.address, amount);
        const ownerBalance = await getBalance(api, this.#owner.address);
        const info = await transfer.paymentInfo(this.#owner);
        const fundsNotEnough = ownerBalance.lt(amount.add(info.partialFee));
        if (fundsNotEnough) {
            throw new Error("owner balance not enough for transaction");
        }
        await (0, utils_1.waitExtrinsic)(api, transfer, this.#owner);
        return this.contractBalance();
    }
    // Set new `coupon` with declared amount.
    async addCoupon(coupon) {
        return (0, utils_1.execContractCallWithResult)(this.#contract, this.#owner, "addCoupon", coupon.public, coupon.amount);
    }
    // Set array `max N items` of `coupon` with declared per key.
    async addCoupons(coupons, amount, limit = 5) {
        if (coupons.length > limit) {
            throw new Error(`Max ${limit} coupons can be added with this method`);
        }
        const $coupons = coupons.map(coupon => coupon.public);
        const result = await (0, utils_1.execContractCallWithResult)(this.#contract, this.#owner, "addCoupons", $coupons, amount);
        result.accepted = result.accepted.filter(v => !!v);
        result.declined = result.declined.filter(v => !!v);
        return result;
    }
    // Verification that the coupon is registered and it's value
    async checkCoupon(coupon) {
        const publicKey = typeof coupon === "string" ? coupon : coupon.public;
        const query = await this.#contract.query.checkCoupon(this.#owner.address, { gasLimit: -1 }, publicKey);
        const data = query.output.toJSON();
        return [data[0], new BN(data[1])];
    }
    // Activate `coupon` with transfer of appropriate liquidity to a receiver's address.
    async activateCoupon(coupon, receiver) {
        const signature = (0, ocex_coupon_signature_1.get_coupon_signature)(this.#contract.address.toHex(), receiver, coupon.secret);
        return (0, utils_1.execContractCallWithResult)(this.#contract, this.#owner, "activateCoupon", receiver, coupon.public, signature);
    }
    // Method for disabling and burning registered (but not redeemed) coupons.
    async burnCoupons(coupons, limit = 5) {
        if (coupons.length > limit) {
            throw new Error(`Max ${limit} coupons can be added with this method`);
        }
        const $coupons = coupons.map(coupon => coupon.public);
        const result = await (0, utils_1.execContractCallWithResult)(this.#contract, this.#owner, "burnCoupons", $coupons);
        result.accepted = result.accepted.filter(v => !!v);
        result.declined = result.declined.filter(v => !!v);
        return result;
    }
    // Method for transferring spare balance (not reserved for coupons)
    async paybackNotReservedFunds() {
        return (0, utils_1.execContractCallWithResult)(this.#contract, this.#owner, "paybackNotReservedFunds");
    }
    // Create contract helper class instance from scratch
    static async instantiateWithCode(api, owner, wasm) {
        const contract = await (0, upload_1.uploadContract)(api, owner, wasm);
        return new Ocex(contract, owner);
    }
    // Create contract helper class instance from known address
    static async fromAddress(api, owner, address) {
        const contract = new base_1.Contract(api, upload_1.CONTRACT_ABI, address, api_1.toPromiseMethod);
        return new Ocex(contract, owner);
    }
}
exports.Ocex = Ocex;
//# sourceMappingURL=contract.js.map