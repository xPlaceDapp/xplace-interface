import xplaceAbi from '../abis/xplace-abi'
import { AbiRegistry, Address, SmartContract, U64Value } from '@multiversx/sdk-core/out'
import { refreshAccount, sendTransactions } from '../helpers'

export const CONTRACT_ADDRESS = 'erd1qqqqqqqqqqqqqpgq590zplleun0rdtts7kh5pk4cpjmuyaxdvl0s5jzxjl' // TODO : remove

export const changePixel: (x: number, y: number, newColorDiscriminant: number) => Promise<{ sessionId: number }> = async (x, y, newColorDiscriminant) => {
  const abi = xplaceAbi
  const abiRegistry = AbiRegistry.create(abi)

  const contract = new SmartContract({
    address: new Address(CONTRACT_ADDRESS),
    abi: abiRegistry
  })

  const account = await refreshAccount()
  const address = account?.address

  if (address === undefined) {
    return
  }

  const tx = contract.methodsExplicit.changePixelColor([
    new U64Value(x),
    new U64Value(y),
    new U64Value(newColorDiscriminant)
  ])
    .withSender(new Address(address))
    .withGasLimit(600000000)
    .withChainID('D') // TODO : set dynamically
    .buildTransaction()

  const { sessionId /*, error */ } = await sendTransactions({
    transactions: tx,
    transactionsDisplayInfo: {
      processingMessage: 'Processing Change Color transaction',
      errorMessage: 'An error has occured during change color',
      successMessage: 'Change color transaction successful'
    },
    redirectAfterSign: false
  })

  return sessionId ?? undefined
}
