import { useEffect, useState } from "react"
import { AxiosToken } from "../../Api/Api"
import { useParams } from "react-router-dom"

const EditJoueurGroup = () => {
  const { id } = useParams()

  const [currentPlayers, setCurrentPlayers] = useState([])
  const [allPlayers, setAllPlayers] = useState([])

  const [selectedToAdd, setSelectedToAdd] = useState("")
  const [playersToAdd, setPlayersToAdd] = useState([])
  const [playersToRemove, setPlayersToRemove] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
        const groupRes = await AxiosToken.get(`/group/${id}/list`);
        const playersRes = await AxiosToken.get(`/user/get/joueur/age/${groupRes.data.list[0].type}`)
      
      setCurrentPlayers(groupRes.data.list[0].joueurGroupe)
      setAllPlayers(playersRes.data.players)
    

    } catch (err) {
      console.error("error")
    } finally {
      setLoading(false)
    }
  }

  const handleSelectAdd = () => {
    if (!selectedToAdd) return

    const alreadyInGroup = currentPlayers.some(
      (g) => g.joueurs?.id === Number(selectedToAdd)
    )

    const alreadySelected = playersToAdd.includes(selectedToAdd)

    if (alreadyInGroup || alreadySelected) return

    setPlayersToAdd([...playersToAdd, selectedToAdd])
    setSelectedToAdd("")
  }
  const handleRemove = (groupeJoueurId) => {
    setPlayersToRemove([...playersToRemove, groupeJoueurId])
  }

  const handleSave = async () => {
    try {
      await AxiosToken.put("/group/edit/joueur", {
        groupe_id: id,
        deleteJoueur: playersToRemove,
        ajouteJoueur: playersToAdd
      })

      // reset
      setPlayersToAdd([])
      setPlayersToRemove([])

      fetchData()
    } catch (err) {
      console.error("error")
    }
  }
  if (loading) return <p className="p-6">Chargement...</p>

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Modifier les joueurs du groupe
      </h1>

      {/* CURRENT PLAYERS */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full text-sm">

          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th className="p-3">Nom</th>
              <th className="p-3">Prénom</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentPlayers.map((g) => {

              const isDeleted = playersToRemove.includes(g.id)

              if (isDeleted) return null

              return (
                <tr key={g.id} className="border-b">

                  <td className="p-3">{g.joueurs?.nom}</td>
                  <td className="p-3">{g.joueurs?.prenom}</td>

                  <td className="p-3">
                    <button
                      onClick={() => handleRemove(g.id)}
                      className="text-red-500 hover:underline"
                    >
                      Supprimer
                    </button>
                  </td>

                </tr>
              )
            })}
          </tbody>

        </table>
      </div>

      {/* ADD PLAYER */}
      <div className="mt-6 flex gap-2 items-center">

        <select
          value={selectedToAdd}
          onChange={(e) => setSelectedToAdd(e.target.value)}
          className="border p-2 rounded w-64"
        >
          <option value="">Choisir joueur</option>

          {allPlayers?.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nom} {p.prenom}
            </option>
          ))}

        </select>

        <button
          onClick={handleSelectAdd}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Ajouter
        </button>

      </div>

      {/* PREVIEW ADDED PLAYERS */}
      {playersToAdd.length > 0 && (
        <div className="mt-4">

          <p className="text-sm font-semibold mb-2">
            Joueurs à ajouter:
          </p>

          <ul className="text-sm text-green-600">
            {playersToAdd.map((id) => {
              const removePlayer = (id) => {
                setPlayersToAdd(prev => prev.filter(p => p !== id));
              };
              const p = allPlayers.find(p => p.id === id)
              return <li
                className="cursor-pointer group"
                onClick={() => removePlayer(id)}
                key={id}
              >
                <span className="group-hover:hidden">+</span>
                <span className="hidden group-hover:inline">-</span>{" "}
                
                <span className="group-hover:text-red-500">
                  {p?.nom} {p?.prenom}
                </span>
              </li>
            })}
          </ul>

        </div>
      )}

      {/* SAVE BUTTON */}
      <div className="mt-6">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Enregistrer les modifications
        </button>
      </div>

    </div>
  )
}

export default EditJoueurGroup