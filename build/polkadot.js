"use strict";
// Re-exports base polkadot packages for fix esm duplicate issue
// https://github.com/polkadot-js/api/issues/4315
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = exports.util = exports.keyring = exports.utilCrypto = exports.decodePair = void 0;
const tslib_1 = require("tslib");
const decode_1 = require("@polkadot/keyring/pair/decode");
Object.defineProperty(exports, "decodePair", { enumerable: true, get: function () { return decode_1.decodePair; } });
const utilCrypto = require("@polkadot/util-crypto");
exports.utilCrypto = utilCrypto;
const keyring = require("@polkadot/keyring");
exports.keyring = keyring;
tslib_1.__exportStar(require("@polkadot/keyring/types"), exports);
const util = require("@polkadot/util");
exports.util = util;
const api = require("@polkadot/api");
exports.api = api;
//# sourceMappingURL=polkadot.js.map