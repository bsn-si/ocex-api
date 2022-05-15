"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadContract = exports.CONTRACT_ABI = void 0;
const base_1 = require("@polkadot/api-contract/base");
const api_1 = require("@polkadot/api");
const api_contract_1 = require("@polkadot/api-contract");
const contract_metadata_1 = require("./contract.metadata");
const utils_1 = require("./utils");
exports.CONTRACT_ABI = new api_contract_1.Abi(contract_metadata_1.default);
// Helper for simple upload & instantiate smartcontract onchain
async function uploadContract(api, signer, wasm) {
    const code = new base_1.Code(api, exports.CONTRACT_ABI, wasm, api_1.toPromiseMethod);
    const extrinsic = code.tx.default({ gasLimit: 3000n * 1000000n });
    const query = (await (0, utils_1.waitExtrinsic)(api, extrinsic, signer));
    return query.contract;
}
exports.uploadContract = uploadContract;
//# sourceMappingURL=upload.js.map