import { useProfile } from "../../utils/context/useProfile"
import { BiMenu, BiLogOut } from "react-icons/bi"
import { HiEllipsisVertical } from "react-icons/hi2"
import { useState } from "react"

const TopBar = ({ setIsOpen }) => {
  const { user } = useProfile()
  const [showDropdown, setShowDropdown] = useState(false)

  const getRoleLabel = (role) => {
    const labels = {
      admin: "Administrateur",
      joueur: "Joueur",
      entraineur: "Entraîneur",
      parent: "Parent",
    }
    return labels[role] || role
  }

  const getAvatarColor = (role) => {
    const colors = {
      admin: "bg-gradient-to-br from-purple-500 to-pink-500",
      joueur: "bg-gradient-to-br from-blue-500 to-cyan-500",
      entraineur: "bg-gradient-to-br from-orange-500 to-red-500",
      parent: "bg-gradient-to-br from-green-500 to-emerald-500",
    }
    return colors[role] || "bg-gradient-to-br from-slate-500 to-slate-600"
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Manrope:wght@400;500;600&display=swap');

        .topbar-root {
          font-family: 'Manrope', sans-serif;
        }

        .avatar {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        .dropdown-fade {
          animation: fadeInDown 0.2s ease-out forwards;
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .user-card {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
          border: 1px solid rgba(59, 130, 246, 0.2);
          backdrop-filter: blur(10px);
        }

        .pulse-dot {
          animation: pulseDot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulseDot {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>

      <div className="topbar-root w-full h-20 bg-gradient-to-r from-slate-800 via-slate-800 to-slate-900 border-b border-slate-700/50 shadow-xl flex items-center justify-between px-6 sticky top-0 z-50 backdrop-blur-xl bg-opacity-95">
        
        {/* LEFT - MENU TRIGGER */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden p-2 hover:bg-slate-700 rounded-lg transition text-slate-300 hover:text-white"
            title="Ouvrir le menu"
          >
            <BiMenu size={24} />
          </button>

          <div className="hidden sm:block">
            <h1 className="text-sm font-bold text-slate-400 tracking-widest uppercase">
              Tableau de bord
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Bienvenue
            </p>
          </div>
        </div>

        {/* RIGHT - USER INFO */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-700/40 transition group"
          >
            {/* AVATAR */}
            <div className={`avatar relative w-10 h-10 rounded-full ${getAvatarColor(user?.role)} shadow-lg flex items-center justify-center font-bold text-white text-sm group-hover:scale-110 transition-transform`}>
              {user?.nom?.charAt(0)?.toUpperCase()}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-800 pulse-dot" />
            </div>

            {/* INFO */}
            <div className="hidden sm:block text-left leading-tight">
              <p className="font-semibold text-sm text-white group-hover:text-blue-300 transition">
                {user?.nom}
              </p>
              <p className="text-xs text-slate-400 group-hover:text-slate-300 transition">
                {getRoleLabel(user?.role)}
              </p>
            </div>
          </button>

      
        </div>
      </div>

      {/* OVERLAY - Close dropdown when clicking outside */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </>
  )
}

export default TopBar