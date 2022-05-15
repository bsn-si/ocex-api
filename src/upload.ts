import { Code, Contract } from "@polkadot/api-contract/base"
import { KeyringPair } from "@polkadot/keyring/types"
import { toPromiseMethod } from "@polkadot/api"
import { ApiBase } from "@polkadot/api/base"
import { Abi } from "@polkadot/api-contract"

import metadata from "./contract.metadata"
import { waitExtrinsic } from "./utils"

export const CONTRACT_ABI = new Abi(metadata as any)

// Helper for simple upload & instantiate smartcontract onchain
export async function uploadContract(
  api: ApiBase<"promise">,
  signer: KeyringPair,
  wasm: string | Uint8Array | Buffer,
): Promise<Contract<"promise">> {
  const code = new Code(api, CONTRACT_ABI, wasm, toPromiseMethod)
  const extrinsic = code.tx.default({ gasLimit: 3000n * 1000000n })

  const query = (await waitExtrinsic(api, extrinsic, signer)) as any
  return query.contract
}
