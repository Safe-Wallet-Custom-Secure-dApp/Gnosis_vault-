// dashboard-data.ts
import { ethers } from 'ethers'
import Safe, { EthersAdapter } from '@safe-global/protocol-kit'
import SafeApiKit from '@safe-global/api-kit'

export async function getSafeDashboardData() {
  const provider = new ethers.JsonRpcProvider('https://arb1.arbitrum.io/rpc') // Example: Arbitrum
  const wallet = new ethers.Wallet(process.env.SAFE_PRIVATE_KEY!, provider)

  const ethAdapter = new EthersAdapter({ ethers, signerOrProvider: wallet })
  const safeAddress = '0xYourSafeAddress'
  const safeSdk = await Safe.create({ ethAdapter, safeAddress })

  const threshold = await safeSdk.getThreshold()
  const owners = await safeSdk.getOwners()
  const balance = await provider.getBalance(safeAddress)

  return {
    threshold,
    owners,
    balance: ethers.formatEther(balance)
  }
}
