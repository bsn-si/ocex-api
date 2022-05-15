/// <reference types="node" />
import { Contract } from "@polkadot/api-contract/base";
import { KeyringPair } from "@polkadot/keyring/types";
import { ApiBase } from "@polkadot/api/base";
import { Abi } from "@polkadot/api-contract";
export declare const CONTRACT_ABI: Abi;
export declare function uploadContract(api: ApiBase<"promise">, signer: KeyringPair, wasm: string | Uint8Array | Buffer): Promise<Contract<"promise">>;
