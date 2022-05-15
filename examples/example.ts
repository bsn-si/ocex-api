import { cryptoWaitReady } from "@polkadot/util-crypto"
import { ApiPromise, WsProvider } from "@polkadot/api"
import { Keyring } from "@polkadot/keyring"
import { u8aToHex } from "@polkadot/util"

import * as fs from "fs/promises"
import * as path from "path"

import { BalanceGrade, fmtBalance, getBalance, Coupon, Ocex } from "../dist"

const keyring = new Keyring({ type: "sr25519" })

// prettier-ignore
async function main() {
  await cryptoWaitReady()

  // Initialise the provider to connect to the local node
  const provider = new WsProvider("ws://127.0.0.1:9944")
  const client = await ApiPromise.create({ provider })

  // Common owner keys
  const owner = keyring.addFromUri("//Alice")
  console.log("Owner: ", owner.address)

  // Instantiate new contract on chain
  const wasm = await fs.readFile(path.join(__dirname, "../contract/ocex.wasm"))
  const contract = await Ocex.instantiateWithCode(client, owner, wasm)
  console.log("Contract instantiated: ", contract.address.toHex())

  // Fill contract balance
  const filledContractBalance = await contract.fillBalance(getBalance(100, BalanceGrade.Unit))
  console.log("Contract balance after fill: ", filledContractBalance)

  // Contract total balance
  const balance = await contract.contractBalance()
  console.log("Current contract balance: ", fmtBalance(balance, BalanceGrade.Unit).toString())

  // This coupon is //Bob account
  const coupon_1 = new Coupon("0x398f0c28f98885e046333d4a41c19cee4c37368a9832c6502f6cfd182e2aef89", getBalance(50, BalanceGrade.Unit))

  // Insert one coupon
  const insertResult = await contract.addCoupon(coupon_1)
  console.log("Coupon inserted: ", insertResult)

  // Check coupon exists
  const couponExists = await contract.checkCoupon(coupon_1)
  console.log("Check: ", couponExists)

  // Contract spare funds after add coupon
  const availableBalance = await contract.availableBalance()
  console.log("Available balance: ", fmtBalance(availableBalance, BalanceGrade.Unit).toString())

  // Insert multiple coupons 
  const coupon_2 = Coupon.generate(getBalance(50, BalanceGrade.Unit))
  const multipleInsertResult = await contract.addCoupons([coupon_2], getBalance(50, BalanceGrade.Unit))
  console.log("Multiple coupons inserted: ", multipleInsertResult)

  // activate coupon and transfer funds to Charlie
  const receiver = keyring.addFromUri("//Charlie")
  const activated = await contract.activateCoupon(coupon_1, u8aToHex(receiver.addressRaw))
  console.log("Coupon activated: ", coupon_1.public, activated)

  // exit
  process.exit(0)
}

main()
