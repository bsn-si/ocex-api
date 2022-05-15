"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.polkadot = void 0;
const tslib_1 = require("tslib");
const utilCrypto = require("@polkadot/util-crypto");
const keyring = require("@polkadot/keyring");
const util = require("@polkadot/util");
const api = require("@polkadot/api");
tslib_1.__exportStar(require("./contract"), exports);
tslib_1.__exportStar(require("./coupon"), exports);
tslib_1.__exportStar(require("./upload"), exports);
tslib_1.__exportStar(require("./utils"), exports);
// Re-exports base polkadot packages for fix esm duplicate issue
// https://github.com/polkadot-js/api/issues/4315
exports.polkadot = {
    utilCrypto,
    keyring,
    util,
    api,
};
//# sourceMappingURL=index.js.map