import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AuthProtection from './protection/AuthProtection'
import DashboardHome from './dashboard/DashboardHome'
import RoleProtection from './protection/RoleProtection'
import Groups from './dashboard/admin/ListGroupes'
import ListeEntraineurs from './dashboard/admin/Users/ListeEntraineurs'
import AddEntraineur from './dashboard/admin/Users/AddEntraineur'
import AddGroupe from './dashboard/admin/AddGroup'
import AddEmploi from './dashboard/admin/AddEmploi'
import AddJoueurGroupAuto from './dashboard/admin/AddJoueurGroupAuto'
import AddJoueurGroupManual from './dashboard/admin/AddJoueurGroupManual'
import Emploi from './dashboard/Emploi'
import ListeParent from './dashboard/admin/Users/ListeParent'
import ListeJoueur from './dashboard/admin/Users/ListeJoueur'
import ListJoueursGroupe from './dashboard/admin/ListJoueursGroupe'
import AddChild from './dashboard/admin/Users/AddChild'
import EditJoueurGroup from './dashboard/admin/EditJoueurGroup'
import Presence from './dashboard/entraineur/Presence'
import EditEmploi from './dashboard/admin/EditEmploi'
import Payment from './dashboard/joueur/Payment'
import AddCategory from './dashboard/admin/AddCategory'
import CategoriesList from './dashboard/admin/CategoriesList'
import PlayersPaymentStatus from './dashboard/admin/PlayersPaymentStatus'
import Analyse from './dashboard/admin/Analyse'
import MessageAdmin from './dashboard/admin/MessageAdmin'
import Testing from './dashboard/admin/Testing'
import Boutique from './dashboard/admin/Boutique'
import CreateProduct from './dashboard/admin/CreateProduct'
import CreateTest from './dashboard/admin/CreateTest'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}  />
      <Route element={<AuthProtection />}>
      <Route path='/login' element={<Login />}  />
      <Route path='/inscription' element={<Register />}  />
      </Route>
      <Route element={<RoleProtection allowRole={["joueur","parent","entraineur","admin"]} />}>
      <Route path='/dashboard' element={<DashboardHome />}>
        <Route path="" element={<Analyse />}/>
        <Route path="messages" element={<MessageAdmin />}/>
        <Route path="testing" element={<Testing />}/>
        <Route path="testing/add" element={<CreateTest />}/>
        <Route path="groupes" element={<Groups />}/>
        <Route path="boutique" element={<Boutique />}/>
        <Route path="boutique/product/add" element={<CreateProduct />}/>
        <Route path="groupes/:id/emploi/add" element={<AddEmploi />}/>
        <Route path="groupes/:id/emploi/edit" element={<EditEmploi />}/>
        <Route path="groupes/add" element={<AddGroupe />}/>
        <Route path="groupes/:id/joueurs/add" element={<AddJoueurGroupManual />}/>
        <Route path="groupes/:id/joueurs/edit" element={<EditJoueurGroup />}/>

        <Route path="groupes/:id/joueurs/auto" element={<AddJoueurGroupAuto />}/>
        <Route path="groupes/:id/list" element={<ListJoueursGroupe />}/>
        <Route path="utilisateurs/entraineurs" element={<ListeEntraineurs />}/>
        <Route path="utilisateurs/parents" element={<ListeParent />}/>
        <Route path="utilisateurs/joueurs" element={<ListeJoueur />}/>
        <Route path="utilisateurs/entraineurs/add" element={<AddEntraineur />}/>
        <Route path="utilisateurs/child/add" element={<AddChild />}/>

        <Route path="paiement" element={<Payment />} />

        <Route path="presence" element={<Presence />}/>

        <Route path="emploi" element={<Emploi />}/>


        <Route path="gestion-paiements" element={<CategoriesList />}/>

        <Route path="gestion-paiements/add" element={<AddCategory />}/>
        <Route path="paiements-joueurs" element={<PlayersPaymentStatus />}/>





      </Route>
      
      </Route>

    </Routes>
  )
}

export default App