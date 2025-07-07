'use client'

import { useEffect, useState } from 'react'
import { getSafeDashboardData } from '../dashboard-data'

export default function SafeDashboard() {
  const [data, setData] = useState(null)

  useEffect(() => {
    getSafeDashboardData().then(setData)
  }, [])

  if (!data) return <p>Loading Safe info...</p>

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">🔐 Safe Overview</h2>
      <p><strong>Threshold:</strong> {data.threshold}</p>
      <p><strong>Owners:</strong> {data.owners.join(', ')}</p>
      <p><strong>Balance:</strong> {data.balance} ETH</p>
    </div>
  )
}
