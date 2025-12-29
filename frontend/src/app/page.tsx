'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">BaseTreasury</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Transparent on-chain treasury analytics for Base
            </p>
          </div>
          <ConnectButton />
        </header>

        {/* Hero Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Where did this DAO spend funds?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              BaseTreasury makes spending transparent, explainable, and accountable by default.
            </p>
            <div className="flex gap-4">
              <Link
                href="/treasury"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Explore Treasuries
              </Link>
              <Link
                href="/docs"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
              >
                Documentation
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-3">📊 Analytics</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Track total assets, monthly burn rate, and runway for any treasury.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-3">🏷️ Classification</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Automatic categorization of spending: grants, salaries, development, and more.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-3">🔍 Transparency</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Public dashboards and APIs for complete transparency.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-gray-100 dark:bg-gray-900 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6">Built for Base</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold text-blue-600">8453</div>
              <div className="text-gray-600 dark:text-gray-400">Chain ID</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">100%</div>
              <div className="text-gray-600 dark:text-gray-400">Open Source</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">∞</div>
              <div className="text-gray-600 dark:text-gray-400">Composable</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">🚀</div>
              <div className="text-gray-600 dark:text-gray-400">Public Good</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

