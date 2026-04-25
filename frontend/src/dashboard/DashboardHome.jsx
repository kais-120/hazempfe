import React from "react"
import TopBar from "../components/dashboard/TopBar"
import Sidebar from "../components/dashboard/SideBar"
import { Outlet } from "react-router-dom"

const DashboardHome = () => {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <div className="flex flex-col flex-1">

        {/* TOPBAR */}
        <TopBar />

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>
    </div>
  )
}

export default DashboardHome