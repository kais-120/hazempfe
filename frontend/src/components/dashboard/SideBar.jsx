import { Link, NavLink, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useProfile } from "../../utils/context/useProfile"
import { AxiosToken } from "../../Api/Api"
import { FaCreditCard, FaRegCalendarAlt, FaShoppingCart, FaUser, FaUsers, FaUserTie } from "react-icons/fa";
import { MdFamilyRestroom, MdGroupAdd, MdOutlinePayments, MdSpaceDashboard } from "react-icons/md";
import { IoArrowDown, IoArrowUp, IoFootball } from "react-icons/io5";
import { IoMdChatbubbles } from "react-icons/io";
import { HiMiniBanknotes } from "react-icons/hi2";
import { FaMoneyCheckDollar } from "react-icons/fa6";



const Sidebar = () => {
  const { user } = useProfile()
  const [openUsers, setOpenUsers] = useState(false)
  const [child,setChild] = useState();
  const [currentChild,setCurrentChild] = useState(null);
  const navigate = useNavigate()

  useEffect(()=>{
    const childData = async () => {
      if(user?.role !== "parent") return
      try{
        const child = window.localStorage.getItem("child")
        setCurrentChild(child)
        const res = await AxiosToken.get("/user/parent/get/child");
        setChild(res.data.children)
      }catch{
        console.error("error")
      }
      
    }
    childData()
  },[user])
console.log(currentChild)
  return (
    <div className="w-64 h-screen bg-black text-white p-5 border-r border-yellow-500/20 shadow-lg flex flex-col">

      {/* BRAND */}
      <h2 className="text-xl font-semibold uppercase tracking-widest border-b border-yellow-500/20 pb-4 mb-6">
        <Link to={"/"}>Académie</Link>
      </h2>

      <ul className="flex flex-col gap-1 text-sm">

        {user?.role === "joueur" && (
          <>
            <NavItem to="/dashboard/emploi" icon={<FaRegCalendarAlt />}>Emploi</NavItem>
            <NavItem to="/dashboard/paiement" icon={<FaCreditCard /> }>Paiement</NavItem>
            <NavItem to="/dashboard/messages" icon={<IoMdChatbubbles />}>Message</NavItem>
            <NavItem to="/dashboard/profil" icon={<FaUser />}>Profil</NavItem>
            <NavItem to="/dashboard/statistiques" icon={<MdSpaceDashboard />}>Statistiques</NavItem>
          </>
        )}

        {/* ================= COACH ================= */}
        {user?.role === "entraineur" && (
          <>
            <NavItem to="/dashboard/emploi" icon="🏃">Emploi</NavItem>
            <NavItem to="/dashboard/joueurs" icon="👥">Liste des joueurs</NavItem>
            <NavItem to="/dashboard/messages" icon="💬">Message</NavItem>
            <NavItem to="/dashboard/entrainements" icon="🏋️">Gestion entraînements</NavItem>
            <NavItem to="/dashboard/performance" icon="📈">Suivi performance</NavItem>
            <NavItem to="/dashboard/presence" icon="📅">Présence</NavItem>
            <NavItem to="/dashboard/rapports" icon="📄">Rapports</NavItem>
          </>
        )}

        {/* ================= ADMIN ================= */}
        {user?.role === "admin" && (
          <>
            <NavItem to="/dashboard/analyse" icon={<MdSpaceDashboard />}>Analyse de données</NavItem>

            {/* USERS DROPDOWN */}
            <li>
              <button
                onClick={() => setOpenUsers(!openUsers)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-md text-white/60 hover:text-yellow-400 hover:bg-yellow-500/10 transition"
              >
                <span className="flex items-center gap-2">
                <FaUsers />
                Liste utilisateurs
                </span>
                <span>{openUsers ? <IoArrowUp /> : <IoArrowDown />}</span>
              </button>

              {openUsers && (
                <div className="ml-6 mt-1 flex flex-col gap-1 border-l border-yellow-500/20 pl-3">

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
              )}
            </li>

            <NavItem to="/dashboard/boutique" icon={<FaShoppingCart />}>Boutique</NavItem>
            <NavItem to="/dashboard/boutique" icon={<FaMoneyCheckDollar />}>Gestion des paiements</NavItem>
            <NavItem to="/dashboard/messages" icon={<HiMiniBanknotes />}>Paiements des joueurs</NavItem>
            <NavItem to="/dashboard/messages" icon={<IoMdChatbubbles />}>Message</NavItem>
            <NavItem to="/dashboard/groupes" icon={<MdGroupAdd />}>Groupes</NavItem>
          </>
        )}

        {user?.role === "parent" && (
  <>
    <div className="mb-4 border-b border-yellow-500/20 pb-3">

      <p className="text-xs text-white/50 mb-2">
        Enfant sélectionné
      </p>

      <select 
      value={currentChild}
      onChange={(e) => {
      localStorage.setItem("child", e.target.value)
      window.location.reload()
      }}
     className="w-full cursor-pointer bg-black border border-yellow-500/20 p-2 rounded text-sm text-white">
          <option selected disabled>selection un entant</option>
    {child?.map((item) => {
      const joueur = item.joueurParent

      return (
        <option onClick={()=>{
          
        }} key={joueur.id} value={joueur.id}>
          {joueur.nom}
        </option>
      )
    })}

  </select>

  <button
    onClick={() => navigate("utilisateurs/child/add")}
    className="mt-2 text-yellow-400 text-sm hover:underline"
  >
    + Ajouter un enfant
  </button>

    </div>

    {/* MENU */}
    <NavItem to="/dashboard/emploi" icon={<FaRegCalendarAlt /> }>
      Emploi
    </NavItem>

    <NavItem to="/dashboard/parent/paiement" icon="💳">
      Paiement
    </NavItem>

    <NavItem to="/dashboard/parent/messages" icon="💬">
      Messages
    </NavItem>

    <NavItem to="/dashboard/parent/profil" icon="👤">
      Profil enfant
    </NavItem>
  </>
)}

      </ul>
    </div>
  )
}

/* Reusable item */
function NavItem({ to, icon, children }) {
  return (
    <li>
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 ${
        isActive
          ? "text-yellow-400 bg-yellow-500/10"
          : "text-white/60 hover:text-yellow-400 hover:bg-yellow-500/10"
      }`
    }
  >
    {icon}
    {children}
  </NavLink>
</li>
  )
}

export default Sidebar