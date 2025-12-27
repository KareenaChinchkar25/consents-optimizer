import React, { useState } from "react"
import { Routes, Route } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import DashboardLayout from "./layouts/DashboardLayout"
import DashboardPage from "./pages/DashboardPage"
import ProfilePage from "./components/ProfilePage";
import { ConsentProvider } from "./context/ConsentContext"
import ErrorBoundary from "./components/ErrorBoundary"
import "./index.css"
import { HistoryIcon } from "lucide-react"
import HistoryPage from "./pages/HistoryPage"
import SettingsPage from "./pages/SettingsPage"
import RiskInsightsPage from "./pages/RiskInsightsPage"

function App() {
  const [showDashboard, setShowDashboard] = useState(false)

  return (
    <ErrorBoundary>
      <ConsentProvider>
        {showDashboard ? (
          <Routes>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/risk-insights" element={<RiskInsightsPage />} />
            </Route>
          </Routes>
        ) : (
          <LandingPage onEnterDashboard={() => setShowDashboard(true)} />
        )}
      </ConsentProvider>
    </ErrorBoundary>
  )
}

export default App
