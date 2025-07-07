// dashboard-data.ts
import { ethers } from 'ethers'
import Safe, { EthersAdapter } from '@safe-global/protocol-kit'
import SafeApiKit from '@safe-global/api-kit'

export async function getSafeDashboardData() {
  const provider = new ethers.JsonRpcProvider('https://rpc.ankr.com/eth') // or Arbitrum, etc
  const owner = new ethers.Wallet('0xabc...your_private_key', provider)

  const ethAdapter = new EthersAdapter({ ethers, signerOrProvider: owner })
  const safeAddress = '0xYourSafeAddress'
  const safeSdk = await Safe.create({ ethAdapter, safeAddress })
  const api = new SafeApiKit({ chainId: 1 })

  const threshold = await safeSdk.getThreshold()
  const owners = await safeSdk.getOwners()
  const balance = await provider.getBalance(safeAddress)

  return {
    threshold,
    owners,
    balance: ethers.formatEther(balance)
  }
}
