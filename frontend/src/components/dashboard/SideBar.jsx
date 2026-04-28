import { Link, NavLink, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useProfile } from "../../utils/context/useProfile"
import { AxiosToken } from "../../Api/Api"
import { FaCreditCard, FaRegCalendarAlt, FaShoppingCart, FaUser, FaUsers, FaUserTie, FaSignOutAlt, FaFile } from "react-icons/fa"
import { MdFamilyRestroom, MdGroupAdd, MdSpaceDashboard, MdAnalytics, MdOutlineAssignment } from "react-icons/md"
import { IoArrowDown, IoArrowUp, IoFootball, IoClose } from "react-icons/io5"
import { IoMdChatbubbles, IoMdTrendingUp } from "react-icons/io"
import { HiMiniBanknotes, HiOutlineCalendarDays } from "react-icons/hi2"
import { FaMoneyCheckDollar, FaBarChart } from "react-icons/fa6"
import { BiMenu } from "react-icons/bi"
import { SportShoe } from "lucide-react"

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user } = useProfile()
  const [openUsers, setOpenUsers] = useState(false)
  const [child, setChild] = useState()
  const [currentChild, setCurrentChild] = useState(null)
  const navigate = useNavigate()
  console.log(openUsers)

  useEffect(() => {
    const childData = async () => {
      if (user?.role !== "parent") return
      try {
        const child = window.localStorage.getItem("child")
        setCurrentChild(child)
        const res = await AxiosToken.get("/user/parent/get/child")
        setChild(res.data.children)
      } catch {
        console.error("error")
      }
    }
    childData()
  }, [user])

  const menuVariants = {
    joueur: [
      { to: "/dashboard/emploi", icon: <FaRegCalendarAlt />, label: "Emploi" },
      { to: "/dashboard/paiement", icon: <FaCreditCard />, label: "Paiement" },
      { to: "/dashboard/messages", icon: <IoMdChatbubbles />, label: "Messages" },
      { to: "/dashboard/profil", icon: <FaUser />, label: "Profil" },
      { to: "/dashboard/statistiques", icon: <MdSpaceDashboard />, label: "Statistiques" },
    ],
    entraineur: [
      { to: "/dashboard/emploi", icon: <FaRegCalendarAlt />, label: "Emploi" },
      { to: "/dashboard/joueurs", icon: <FaUsers />, label: "Joueurs" },
      { to: "/dashboard/messages", icon: <IoMdChatbubbles />, label: "Messages" },
      { to: "/dashboard/entrainements", icon: <MdOutlineAssignment />, label: "Entraînements" },
      { to: "/dashboard/performance", icon: <IoMdTrendingUp />, label: "Performance" },
      { to: "/dashboard/presence", icon: <HiOutlineCalendarDays />, label: "Présence" },
      { to: "/dashboard/rapports", icon: <FaFile />, label: "Rapports" },
    ],
    admin: [
      { to: "/dashboard/testing", icon: <SportShoe />, label: "Testing" },
    ],
    parent: [
      { to: "/dashboard/emploi", icon: <FaRegCalendarAlt />, label: "Emploi" },
      { to: "/dashboard/parent/paiement", icon: <FaCreditCard />, label: "Paiement" },
      { to: "/dashboard/parent/messages", icon: <IoMdChatbubbles />, label: "Messages" },
      { to: "/dashboard/parent/profil", icon: <FaUser />, label: "Profil enfant" },
    ],
  }

  const currentMenu = menuVariants[user?.role] || []

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Manrope:wght@400;500;600;700&display=swap');

        .sidebar-root {
          font-family: 'Manrope', sans-serif;
        }

        .sidebar-brand {
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-item-active {
          position: relative;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);
          border-left: 3px solid #3b82f6;
        }

        .nav-item-active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, #3b82f6 0%, #8b5cf6 100%);
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            height: 0;
          }
          to {
            height: 100%;
          }
        }

        .nav-item {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }

        .nav-item:hover {
          transform: translateX(4px);
        }

        .nav-item-icon {
          transition: transform 0.3s ease;
        }

        .nav-item:hover .nav-item-icon {
          transform: scale(1.2) rotate(5deg);
        }

        .dropdown-arrow {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .dropdown-open .dropdown-arrow {
          transform: rotate(180deg);
        }

        .dropdown-menu {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out;
        }

        .dropdown-open .dropdown-menu {
          max-height: 500px;
          transition: max-height 0.5s ease-in;
        }

        .child-select {
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.3);
          transition: all 0.3s;
        }

        .child-select:hover,
        .child-select:focus {
          background: rgba(59, 130, 246, 0.2);
          border-color: rgba(59, 130, 246, 0.6);
          outline: none;
        }

        .badge-new {
          display: inline-block;
          padding: 2px 8px;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          border-radius: 999px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.5px;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .slide-out {
          animation: slideOut 0.3s ease-out forwards;
        }

        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(-100%);
            opacity: 0;
          }
        }
      `}</style>

      {/* SIDEBAR */}
      <div
        className={`sidebar-root fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white border-r border-slate-700/50 shadow-2xl flex flex-col transition-all duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* BRAND */}
        <div className="p-6 border-b border-slate-700/30 flex items-center justify-between">
          <h2 className="sidebar-brand text-2xl font-bold tracking-wider">
            <Link to="/" className="hover:opacity-80 transition">
              ACADÉMIE
            </Link>
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition"
          >
            <IoClose size={20} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {/* PARENT - CHILD SELECTOR */}
          {user?.role === "parent" && (
            <div className="mb-6 p-4 border border-slate-700/50 rounded-xl bg-slate-800/30 backdrop-blur-sm">
              <p className="text-xs text-slate-400 mb-3 font-semibold tracking-wider">
                👶 ENFANT SÉLECTIONNÉ
              </p>
              <select
                value={currentChild || ""}
                onChange={(e) => {
                  localStorage.setItem("child", e.target.value)
                  window.location.reload()
                }}
                className="child-select w-full p-2.5 rounded-lg text-sm text-white font-medium cursor-pointer"
              >
                <option value="" disabled>
                  Sélectionner un enfant
                </option>
                {child?.map((item) => {
                  const joueur = item.joueurParent
                  return (
                    <option key={joueur.id} value={joueur.id}>
                      {joueur.nom} {joueur.prenom}
                    </option>
                  )
                })}
              </select>
              <button
                onClick={() => navigate("utilisateurs/child/add")}
                className="mt-3 w-full text-sm text-blue-400 hover:text-blue-300 font-semibold transition flex items-center justify-center gap-1"
              >
                + Ajouter enfant
              </button>
            </div>
          )}

          {/* MENU ITEMS */}
          <ul className="space-y-1">
            {/* Admin - Users Dropdown */}
            {user?.role === "admin" && (
              <>
                <NavItem end={true} to="" icon={<MdAnalytics />}>
                  Analyse de données
                </NavItem>

                {/* DROPDOWN */}
                <li className={openUsers ? "dropdown-open" : ""}>
                  <button
                    onClick={() => setOpenUsers(!openUsers)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-slate-300 hover:text-white transition group"
                  >
                    <span className="flex items-center gap-3">
                      <FaUsers className="nav-item-icon text-blue-400" size={16} />
                      <span className="font-medium">Utilisateurs</span>
                    </span>
                    <span className="dropdown-arrow">
                      <IoArrowDown size={14} />
                    </span>
                  </button>

                  {/* SUBMENU */}
                  <div className={`dropdown-menu ml-4 mt-1 flex flex-col gap-1 border-l-2 border-slate-700/50 pl-4 ${openUsers ? "open" : ""}`}>
                    <NavItem to="/dashboard/utilisateurs/joueurs" icon={<IoFootball />}>
                      Joueurs
                    </NavItem>
                    <NavItem to="/dashboard/utilisateurs/parents" icon={<MdFamilyRestroom />}>
                      Parents
                    </NavItem>
                    <NavItem to="/dashboard/utilisateurs/entraineurs" icon={<FaUserTie />}>
                      Entraîneurs
                    </NavItem>
                  </div>
                </li>

                {/* ADMIN MENU */}
                <NavItem to="/dashboard/boutique" icon={<FaShoppingCart />}>
                  Boutique
                </NavItem>
                <NavItem to="/dashboard/gestion-paiements" icon={<FaMoneyCheckDollar />}>
                  Gestion paiements
                </NavItem>
                <NavItem to="/dashboard/paiements-joueurs" icon={<HiMiniBanknotes />}>
                  Paiements joueurs
                </NavItem>
                <NavItem to="/dashboard/messages" icon={<IoMdChatbubbles />}>
                  Messages
                </NavItem>
                <NavItem to="/dashboard/groupes" icon={<MdGroupAdd />}>
                  <span className="flex items-center gap-2">
                    Groupes <span className="badge-new">NOUVEAU</span>
                  </span>
                </NavItem>
              </>
            )}

            {/* GENERIC MENU */}
            {currentMenu.map((item) => (
              <NavItem key={item.to} to={item.to} icon={item.icon}>
                {item.label}
              </NavItem>
            ))}
          </ul>
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t border-slate-700/30 mt-auto">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-700/30 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition font-medium">
            <FaSignOutAlt size={14} />
            Déconnexion
          </button>
        </div>
      </div>

      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

/* Reusable NavItem */
function NavItem({ to, icon, children,end = false }) {
  return (
    <li>
      <NavLink
        to={to}
        end={end}
        className={({ isActive }) =>
          `nav-item flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            isActive
              ? "nav-item-active text-blue-400 font-semibold"
              : "text-slate-400 hover:text-white hover:bg-slate-700/40"
          }`
        }
      >
        <span className="nav-item-icon">{icon}</span>
        <span>{children}</span>
      </NavLink>
    </li>
  )
}

export default Sidebar