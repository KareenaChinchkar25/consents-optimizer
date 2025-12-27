import React from "react"
import Header from "./Header"
import StatsCards from "./StatsCards"
import Filters from "./Filters"
import ConsentList from "./ConsentList"
import LoadingSpinner from "./LoadingSpinner"
import { useConsent } from "../context/ConsentContext"

const Dashboard = () => {
  const { loading } = useConsent()


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 h-16 mb-4">
        <Header />
      </div>

      {/* Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-4">
        <div className="space-y-4">
          <StatsCards />
          <Filters />

          <div className="bg-white border border-gray-200 rounded-lg">
            {loading ? <LoadingSpinner /> : <ConsentList />}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
