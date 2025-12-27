import React from 'react'
import { Shield, RefreshCw, Wifi, WifiOff, Cpu, Home, ChevronRight } from 'lucide-react'

const Header = ({ fetchConsents, loading, lastUpdated, mlBackendStatus }) => {
  // Helper functions
  const getStatusColor = (status) => {
    switch(status) {
      case 'online': return 'bg-emerald-50 border-emerald-200 text-emerald-700'
      case 'offline': return 'bg-gray-100 border-gray-300 text-gray-600'
      case 'degraded': return 'bg-amber-50 border-amber-200 text-amber-700'
      default: return 'bg-gray-100 border-gray-300 text-gray-600'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'online': return <Wifi className="h-4 w-4" />
      case 'offline': return <WifiOff className="h-4 w-4" />
      case 'degraded': return <Cpu className="h-4 w-4" />
      default: return <WifiOff className="h-4 w-4" />
    }
  }

  const getStatusText = (status) => {
    switch(status) {
      case 'online': return 'ML Backend Online'
      case 'offline': return 'ML Backend Offline'
      case 'degraded': return 'Limited ML Functionality'
      default: return 'Status Unknown'
    }
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left Section - Brand & Navigation */}
          <div className="flex items-center space-x-4">
            {/* Home Button */}
            <button
              onClick={() => window.location.reload()}
              className="group relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-900 transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95"
              title="Back to Home"
            >
              <Home className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>

            {/* Separator */}
            <div className="h-8 w-px bg-gradient-to-b from-gray-200 to-transparent"></div>

            {/* Logo & Title */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg">
                  <Shield className="h-4 w-4 text-white" />
                </div>
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Consent Risk Dashboard
                  </h1>
                  
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-gray-500">
                    ML-Powered Privacy Analytics
                  </p>
                  <ChevronRight className="h-3 w-3 text-gray-400" />
                  
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Status & Controls */}
          <div className="flex items-center space-x-6">
            {/* Connection Status Badge */}

            {/* Refresh Button with Enhanced Design */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl blur opacity-30 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <button
                onClick={fetchConsents}
                disabled={loading}
                className="relative inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold text-sm  hover:from-blue-700 hover:to-blue-800  focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <RefreshCw className={`h-4 w-4 mr-2.5 transition-transform ${loading ? 'animate-spin' : 'group-hover:rotate-180'}`} />
                <span className="relative">
                  {loading ? 'Syncing...' : 'Refresh Data'}
                </span>
                {!loading && (
                  <span className="absolute -bottom-1 left-1/4 w-1/2 h-0.5 bg-gradient-to-r from-blue-300 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header