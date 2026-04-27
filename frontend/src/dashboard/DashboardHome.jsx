import React, { useState } from "react"
import TopBar from "../components/dashboard/TopBar"
import Sidebar from "../components/dashboard/SideBar"
import { Outlet } from "react-router-dom"

const DashboardHome = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap');

        body {
          font-family: 'Manrope', sans-serif;
        }

        * {
          font-family: 'Manrope', sans-serif;
        }

        .dashboard-container {
          background: linear-gradient(135deg, #0f172a 0%, #1a2847 100%);
          min-height: 100vh;
        }

        .content-area {
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(71, 85, 105, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.4);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }
      `}</style>

      <div className="dashboard-container flex h-screen">
        {/* SIDEBAR */}
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* MAIN AREA */}
        <div className="flex flex-col flex-1 lg:ml-0">
          {/* TOPBAR */}
          <TopBar setIsOpen={setIsOpen} />

          {/* CONTENT */}
          <main className="content-area flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}

export default DashboardHome