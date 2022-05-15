import { ApiBase, SubmittableExtrinsic } from "@polkadot/api/types";
import { ISubmittableResult } from "@polkadot/types/types";
import { Contract } from "@polkadot/api-contract/base";
import { KeyringPair } from "@polkadot/keyring/types";
import Keyring from "@polkadot/keyring";
import * as BN from "bn.js";
export declare const keyring: Keyring;
export declare const waitExtrinsic: (api: ApiBase<"promise">, extrinsic: SubmittableExtrinsic<"promise", ISubmittableResult>, signer: KeyringPair, waitStatus?: string[]) => Promise<ISubmittableResult>;
export declare const execContractCallWithResult: (contract: Contract<"promise">, signer: KeyringPair, method: string, ...args: unknown[]) => Promise<any>;
export declare enum BalanceGrade {
    Pico = 1,
    Nano = 1000,
    Micro = 1000000,
    Milli = 1000000000,
    Unit = 1000000000000,
    Kilo = 1000000000000000,
    Mill = 1000000000000000000
}
export declare const getBalance: (amount: number, grade: BalanceGrade) => BN;
export declare const fmtBalance: (balance: BN, grade: BalanceGrade) => BN;
