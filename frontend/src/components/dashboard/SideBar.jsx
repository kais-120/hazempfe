import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useProfile } from "../../utils/context/useProfile"
import { AxiosToken } from "../../Api/Api"

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
        Académie
      </h2>

      <ul className="flex flex-col gap-1 text-sm">

        {/* ================= JOUEUR ================= */}
        {user?.role === "joueur" && (
          <>
            <NavItem to="/dashboard/emploi" icon="🏃">Emploi</NavItem>
            <NavItem to="/dashboard/paiement" icon="💳">Paiement</NavItem>
            <NavItem to="/dashboard/messages" icon="💬">Message</NavItem>
            <NavItem to="/dashboard/profil" icon="👤">Profil</NavItem>
            <NavItem to="/dashboard/statistiques" icon="📊">Statistiques</NavItem>
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
            <NavItem to="/dashboard/analyse" icon="📊">Analyse de données</NavItem>

            {/* USERS DROPDOWN */}
            <li>
              <button
                onClick={() => setOpenUsers(!openUsers)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-md text-white/60 hover:text-yellow-400 hover:bg-yellow-500/10 transition"
              >
                <span className="flex items-center gap-2">
                  👤 Liste utilisateurs
                </span>
                <span>{openUsers ? "▲" : "▼"}</span>
              </button>

              {openUsers && (
                <div className="ml-6 mt-1 flex flex-col gap-1 border-l border-yellow-500/20 pl-3">

                  <NavItem to="/dashboard/utilisateurs/joueurs" icon="⚽">
                    Joueurs
                  </NavItem>

                  <NavItem to="/dashboard/utilisateurs/parents" icon="👪">
                    Parents
                  </NavItem>

                  <NavItem to="/dashboard/utilisateurs/entraineurs" icon="🏃">
                    Entraîneurs
                  </NavItem>

                </div>
              )}
            </li>

            <NavItem to="/dashboard/boutique" icon="🛒">Boutique</NavItem>
            <NavItem to="/dashboard/messages" icon="💬">Message</NavItem>
            <NavItem to="/dashboard/tableau-entrainement" icon="📆">
              Tableau d'entraînement
            </NavItem>
            <NavItem to="/dashboard/groupes" icon="👥">Groupes</NavItem>
          </>
        )}
        {/* ================= parent ================= */}

        {user?.role === "parent" && (
  <>
    {/* 🔥 CHILD SELECTOR */}
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
    <NavItem to="/dashboard/emploi" icon="🏃">
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
      <Link
        to={to}
        className="flex items-center gap-2 px-3 py-2 rounded-md text-white/60 hover:text-yellow-400 hover:bg-yellow-500/10 transition-all duration-200"
      >
        <span>{icon}</span>
        {children}
      </Link>
    </li>
  )
}

export default Sidebar