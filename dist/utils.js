"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fmtBalance = exports.getBalance = exports.BalanceGrade = exports.execContractCallWithResult = exports.waitExtrinsic = exports.cryptoKeyring = void 0;
const keyring_1 = require("@polkadot/keyring");
const BN = require("bn.js");
exports.cryptoKeyring = new keyring_1.default({ type: "sr25519" });
const waitExtrinsic = (api, extrinsic, signer, waitStatus) => new Promise(async (resolve, reject) => {
    const unsubscribe = await extrinsic.signAndSend(signer, res => {
        const defaultStatusMatch = res.status.isInBlock || res.status.isFinalized;
        const matchedStatus = waitStatus
            ? !waitStatus.map(key => res.status[key]).includes(false)
            : defaultStatusMatch;
        if (matchedStatus) {
            unsubscribe();
            if (res.dispatchError) {
                let error;
                if (res.dispatchError.isModule) {
                    const decoded = api.registry.findMetaError(res.dispatchError.asModule);
                    const { docs, name, section } = decoded;
                    error = `${section}.${name}: ${docs.join(" ")}`;
                }
                else {
                    error = res.dispatchError.toString();
                }
                reject(error);
            }
            else {
                resolve(res);
            }
        }
    });
});
exports.waitExtrinsic = waitExtrinsic;
const execContractCallWithResult = async (contract, signer, method, ...args) => {
    // Estimate with ~expected value
    const query = (await contract.query[method](signer.address, { gasLimit: -1 }, ...args));
    if (query.result.isOk) {
        const data = query.output.toJSON();
        if (data.ok) {
            const gasLimit = (0, exports.getBalance)(10, BalanceGrade.Milli).add(new BN(query.gasConsumed)).toNumber();
            const extrinsic = contract.tx[method]({ gasLimit }, ...args);
            await (0, exports.waitExtrinsic)(contract.api, extrinsic, signer);
            return data.ok;
        }
        else {
            throw new Error(`Error with add coupon '${data.err}'`);
        }
    }
    else {
        throw query.result.asErr().toJSON();
    }
};
exports.execContractCallWithResult = execContractCallWithResult;
var BalanceGrade;
(function (BalanceGrade) {
    BalanceGrade[BalanceGrade["Pico"] = 1] = "Pico";
    BalanceGrade[BalanceGrade["Nano"] = 1000] = "Nano";
    BalanceGrade[BalanceGrade["Micro"] = 1000000] = "Micro";
    BalanceGrade[BalanceGrade["Milli"] = 1000000000] = "Milli";
    BalanceGrade[BalanceGrade["Unit"] = 1000000000000] = "Unit";
    BalanceGrade[BalanceGrade["Kilo"] = 1000000000000000] = "Kilo";
    BalanceGrade[BalanceGrade["Mill"] = 1000000000000000000] = "Mill";
})(BalanceGrade = exports.BalanceGrade || (exports.BalanceGrade = {}));
const getBalance = (amount, grade) => {
    const number = new BN(amount);
    return number.mul(new BN(grade));
};
exports.getBalance = getBalance;
const fmtBalance = (balance, grade) => {
    return balance.div(new BN(grade));
};
exports.fmtBalance = fmtBalance;
//# sourceMappingURL=utils.js.map