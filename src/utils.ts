import { ApiBase, SubmittableExtrinsic } from "@polkadot/api/types"
import { ISubmittableResult, Signer } from "@polkadot/types/types"
import { Contract } from "@polkadot/api-contract/base"
import { KeyringPair } from "@polkadot/keyring/types"
import Keyring from "@polkadot/keyring"
import * as BN from "bn.js"

export const cryptoKeyring = new Keyring({ type: "sr25519" })

export const waitExtrinsic = (
  api: ApiBase<"promise">,
  extrinsic: SubmittableExtrinsic<"promise", ISubmittableResult>,
  signer: KeyringPair | [string, Signer],
  waitStatus?: string[],
): Promise<ISubmittableResult> =>
  new Promise(async (resolve, reject) => {
    const args: any = Array.isArray(signer) ? [signer[0], { signer: signer[1] }] : [signer, {}]

    const unsubscribe = await extrinsic.signAndSend(args[0], args[1], res => {
      const defaultStatusMatch = res.status.isInBlock || res.status.isFinalized
      const matchedStatus = waitStatus
        ? !waitStatus.map(key => res.status[key]).includes(false)
        : defaultStatusMatch

      if (matchedStatus) {
        unsubscribe()

        if (res.dispatchError) {
          let error
          if (res.dispatchError.isModule) {
            const decoded = api.registry.findMetaError(res.dispatchError.asModule)
            const { docs, name, section } = decoded

            error = `${section}.${name}: ${docs.join(" ")}`
          } else {
            error = res.dispatchError.toString()
          }

          reject(error)
        } else {
          resolve(res)
        }
      }
    })
  })

export const execContractCallWithResult = async (
  contract: Contract<"promise">,
  signer: KeyringPair | [string, Signer],
  method: string,
  ...args: unknown[]
) => {
  const address = Array.isArray(signer) ? signer[0] : signer.address
  
  // Estimate with ~expected value
  const query = (await contract.query[method](address, { gasLimit: -1 }, ...args)) as any

  if (query.result.isOk) {
    const data = query.output.toJSON()

    if (data.ok) {
      const gasLimit = getBalance(10, BalanceGrade.Milli).add(new BN(query.gasConsumed)).toNumber()
      const extrinsic = contract.tx[method]({ gasLimit }, ...args)

      await waitExtrinsic(contract.api, extrinsic, signer)
      return data.ok
    } else {
      throw new Error(`Error with add coupon '${data.err}'`)
    }
  } else {
    throw query.result.asErr().toJSON()
  }
}

export enum BalanceGrade {
  Pico = 1,
  Nano = 1_000,
  Micro = 1_000_000,
  Milli = 1_000_000_000,
  Unit = 1_000_000_000_000,
  Kilo = 1_000_000_000_000_000,
  Mill = 1_000_000_000_000_000_000,
}

export const getBalance = (amount: number, grade: BalanceGrade): BN => {
  const number = new BN(amount)
  return number.mul(new BN(grade))
}

export const fmtBalance = (balance: BN, grade: BalanceGrade): BN => {
  return balance.div(new BN(grade))
}
