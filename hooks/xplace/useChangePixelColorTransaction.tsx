import {
  useTransaction,
  TransactionCallbackParams, useAccount,
} from '@useelven/core'
import xplaceAbi from "../../abis/xplace-abi"
import {AbiRegistry, Address, EnumValue, SmartContract, U64Value} from "@multiversx/sdk-core/out"

export const CONTRACT_ADDRESS = 'erd1qqqqqqqqqqqqqpgq590zplleun0rdtts7kh5pk4cpjmuyaxdvl0s5jzxjl' // TODO : remove

export function useChangePixelColorTransaction(
  cb?: (params: TransactionCallbackParams) => void
) {
  const { pending, triggerTx, txResult, error } = useTransaction({cb})
  const { address } = useAccount()

  const changePixelColor = (x: number, y: number) => {
    const randomDebugColor = Math.floor(Math.random() * 6)

    const abi = xplaceAbi
    const abiRegistry = AbiRegistry.create(abi)

    const contract = new SmartContract({
      address: new Address(CONTRACT_ADDRESS),
      abi: abiRegistry
    })
    const PixelColor = abiRegistry.getEnum('PixelColor')
    const pixelColor = EnumValue.fromDiscriminant(PixelColor, randomDebugColor)

    const tx = contract.methodsExplicit.changePixelColor([
      new U64Value(x),
      new U64Value(y),
      pixelColor
    ])
      .withSender(new Address(address))
      .withGasLimit(600000000)
      .buildTransaction()

    triggerTx({
      address: tx.getReceiver().bech32(),
      data: tx.getData(),
      gasLimit: tx.getGasLimit(),
      value: tx.getValue()
    })
  }

  return {
    changePixelColor,
    pending,
    txResult,
    error
  }
}
