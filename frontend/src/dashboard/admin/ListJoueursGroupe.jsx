import { useEffect, useState } from "react"
import { AxiosToken } from "../../Api/Api"
import { useParams } from "react-router-dom"

const ListJoueursGroupe = () => {
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    fetchGroups()
  }, [])

  const fetchGroups = async () => {
    try {
      setLoading(true)
      const res = await AxiosToken.get(`/group/${id}/list`)
      setGroups(res.data.list[0])
    } catch (err) {
      console.error("error")
    } finally {
      setLoading(false)
    }
  }
console.log(groups)
  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Liste des joueurs
      </h1>

      {loading ? (
        <p className="text-gray-500">Chargement...</p>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-x-auto">

          <table className="w-full text-sm text-left">

            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="p-3">Nom</th>
                <th className="p-3">Prénom</th>
                <th className="p-3">Date création</th>
              </tr>
            </thead>

            <tbody>
              {groups?.joueurGroupe?.map((g) => (
                <tr key={g.id} className="border-b hover:bg-gray-50">

                  <td className="p-3">
                    {g?.joueurs?.nom || "-"}
                  </td>

                  <td className="p-3">
                    {g?.joueurs?.prenom || "-"}
                  </td>

                  <td className="p-3">
                    {new Date(g?.joueurs?.createdAt).toLocaleDateString()}
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

export default ListJoueursGroupe