import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"

const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 flex-1 min-h-screen bg-gray-50">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
