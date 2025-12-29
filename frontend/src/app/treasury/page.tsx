'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function TreasuryPage() {
  const { address } = useAccount()
  const [treasuryAddress, setTreasuryAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>(null)

  const fetchTreasuryData = async () => {
    if (!treasuryAddress) return
    
    setLoading(true)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
      const response = await fetch(`${apiUrl}/treasury/${treasuryAddress}/overview`)
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Error fetching treasury data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Treasury Analytics</h1>
          <ConnectButton />
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter treasury address (0x...)"
              value={treasuryAddress}
              onChange={(e) => setTreasuryAddress(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
            <button
              onClick={fetchTreasuryData}
              disabled={loading || !treasuryAddress}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Analyze'}
            </button>
          </div>
        </div>

        {data && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2">Balance</h3>
              <p className="text-2xl font-bold">{data.balance} ETH</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2">Monthly Burn</h3>
              <p className="text-2xl font-bold">{data.monthlyBurn || 0} ETH</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2">Runway</h3>
              <p className="text-2xl font-bold">{data.runwayMonths || '∞'} months</p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

