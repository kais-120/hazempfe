import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AxiosToken } from "../../../Api/Api"

const ListeEntraineurs = () => {
  const [entraineurs, setEntraineurs] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await AxiosToken.get("/user/entraineur")
      setEntraineurs(res.data.users)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Liste des entraîneurs
        </h1>

        <Link
          to="/dashboard/utilisateurs/entraineurs/add"
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md font-medium transition"
        >
          + Ajouter entraîneur
        </Link>
      </div>

      {/* CONTENT */}
      {loading ? (
        <p className="text-gray-500">Chargement...</p>
      ) : entraineurs.length === 0 ? (
        <p className="text-gray-500">Aucun entraîneur trouvé</p>
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
              {entraineurs.map((e) => (
                <tr key={e.id} className="border-b hover:bg-gray-50">

                  <td className="p-3">{e.nom}</td>
                  <td className="p-3">{e.prenom}</td>
                  <td className="p-3">{e.email}</td>
                  <td className="p-3">{e.num_tel}</td>

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

export default ListeEntraineurs