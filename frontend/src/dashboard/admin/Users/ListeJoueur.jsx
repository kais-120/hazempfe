import { useEffect, useState } from "react"
import { AxiosToken } from "../../../Api/Api"
import LoadingScreen from "../../../components/pages/LoadingScreen"

const ListeJoueur = () => {
  const [joueurs, setJoueurs] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await AxiosToken.get("/user/joueur")
      setJoueurs(res.data.users)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
if(loading) return <LoadingScreen />
  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Liste des joueurs
        </h1>
      </div>

      {/* CONTENT */}
      {loading ? (
        <p className="text-gray-500">Chargement...</p>
      ) : joueurs.length === 0 ? (
        <p className="text-gray-500">Aucun joueur trouvé</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full text-sm text-left">

            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="p-3">Nom</th>
                <th className="p-3">Prénom</th>
                <th className="p-3">Email</th>
                <th className="p-3">Téléphone</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {joueurs.map((e) => (
                <tr key={e.id} className="border-b hover:bg-gray-50">

                  <td className="p-3">{e.nom}</td>
                  <td className="p-3">{e.prenom}</td>
                  <td className="p-3">{e?.email || "--"}</td>
                  <td className="p-3">{e?.num_tel || "--"}</td>

                  <td className="p-3 flex gap-2">
                    <button className="text-blue-600 hover:underline">
                      Voir
                    </button>
                    <button className="text-red-600 hover:underline">
                      Supprimer
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

    </div>
  )
}

export default ListeJoueur