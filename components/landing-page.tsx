'use client'

import { Bike, Package, Settings } from "lucide-react"

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Shop Dashboard</h1>
        </div>
      </header>

      <main className="flex-grow flex flex-col">
        <button className="flex-1 flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 transition-colors">
          <div className="flex flex-col items-center">
            <Bike className="w-16 h-16 mb-2" />
            <span className="text-2xl font-semibold text-center">Fibers for Two-Wheelers</span>
          </div>
        </button>
        <button className="flex-1 flex items-center justify-center bg-green-600 text-white hover:bg-green-700 transition-colors">
          <div className="flex flex-col items-center">
            <Package className="w-16 h-16 mb-2" />
            <span className="text-2xl font-semibold text-center">Accessories</span>
          </div>
        </button>
        <button className="flex-1 flex items-center justify-center bg-orange-600 text-white hover:bg-orange-700 transition-colors">
          <div className="flex flex-col items-center">
            <Settings className="w-16 h-16 mb-2" />
            <span className="text-2xl font-semibold text-center">Spare Parts</span>
          </div>
        </button>
      </main>

      <footer className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">© 2024 Shop Dashboard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}