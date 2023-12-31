import {
  Address,
  AddressValue,
  ContractFunction,
  ResultsParser
} from '@multiversx/sdk-core/out'
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers'
import { useGetAccount, useGetNetworkConfig } from 'hooks'

import { smartContract } from './smartContract'

const resultsParser = new ResultsParser()

export const useGetTimeToPong: () => (() => Promise<number | undefined>) = () => {
  const { network } = useGetNetworkConfig()

  const { address } = useGetAccount()

  const getTimeToPong: () => Promise<number | undefined> = async () => {
    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getTimeToPong'),
        args: [new AddressValue(new Address(address))]
      })
      const provider = new ProxyNetworkProvider(network.apiAddress)

      const queryResponse = await provider.queryContract(query)

      const endpointDefinition = smartContract.getEndpoint('getTimeToPong')

      const { firstValue } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      )

      const secondsRemaining: number = firstValue?.valueOf()?.toNumber()

      return secondsRemaining
    } catch (err) {
      console.error('Unable to call getTimeToPong', err)
    }
  }

  return getTimeToPong
}
