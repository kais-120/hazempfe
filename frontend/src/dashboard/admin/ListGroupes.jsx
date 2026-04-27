import { useEffect, useState } from "react"
import { AxiosToken } from "../../Api/Api"
import { Link } from "react-router-dom"
import { Pen, Trash } from "lucide-react"

const ListGroupes = () => {
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGroups()
  }, [])

  const fetchGroups = async () => {
    try {
      setLoading(true)
      const res = await AxiosToken.get("/group")
      setGroups(res.data.groups)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold text-gray-800">
          Liste des groupes
        </h1>

        {/* ADD BUTTON */}
        <Link
          to="/dashboard/groupes/add"
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md font-medium transition shadow"
        >
          + Ajouter groupe
        </Link>

      </div>

      {/* CONTENT */}
      {loading ? (
        <p className="text-gray-500">Chargement...</p>
      ) : groups.length === 0 ? (
        <p className="text-gray-500">Aucun groupe trouvé</p>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-x-auto">

          <table className="w-full text-sm text-left">

            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="p-3">Libellé</th>
              <th className="p-3">Entraîneur</th>
              <th className="p-3">Téléphone</th>
              <th className="p-3">Date création</th>
              <th className="p-3">Affectation joueurs</th>
              <th className="p-3">Emploi</th>
              <th className="p-3">Actions</th> {/* NEW */}
            </tr>
          </thead>

            <tbody>
  {groups.map((g) => (
    <tr key={g.id} className="border-b hover:bg-gray-50">

      <td className="p-3 font-medium">{g.libelle}</td>

      <td className="p-3">
        {g.entraineur?.nom} {g.entraineur?.prenom}
      </td>

      <td className="p-3">
        {g.entraineur?.num_tel}
      </td>

      <td className="p-3 text-gray-500">
        {new Date(g.createdAt).toLocaleDateString()}
      </td>

      <td className="p-3">
  {g.joueurGroupe?.length === 0 ? (
    <div className="flex gap-2">

      {/* MANUAL */}
      <Link
        to={`/dashboard/groupes/${g.id}/joueurs/add`}
        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
      >
        Manuel
      </Link>

      {/* AUTO */}
      <Link
        to={`/dashboard/groupes/${g.id}/joueurs/auto`}
        className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded text-sm"
      >
        Auto
      </Link>

    </div>
  ) : (
  <div className="flex justify-center gap-2">

    <Link
      to={`/dashboard/groupes/${g.id}/joueurs/edit`}
      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
    >
      Modifier ({g.joueurGroupe.length})
    </Link>

    {/* DELETE */}
    <Link
      to={`/dashboard/groupes/${g.id}/list`}
      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
    >
      Affichage
    </Link>

  </div>
    
  )}
</td>

      <td className="p-3 text-center">
        <Link
          to={`/dashboard/groupes/${g.id}/emploi/edit`}
          className="text-sm bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded-md transition"
        >
          {g?.emploi.length === 0 ? "+ Emploi"  : "Modifier" }
        </Link>
      </td>
      <td className="p-3 text-center">
  <div className="flex justify-center gap-2">

    {/* EDIT */}
    <Link
      to={`/dashboard/groupes/${g.id}/edit`}
      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition"
    >
      <Pen size={16} />
    </Link>

    {/* DELETE */}
    <button
      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition"
    >
      <Trash size={16} />
    </button>

  </div>
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

export default ListGroupes