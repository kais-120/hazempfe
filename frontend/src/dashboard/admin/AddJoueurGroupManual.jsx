import { useEffect, useState } from "react"
import { AxiosToken } from "../../Api/Api"
import { useParams } from "react-router-dom"

const AddJoueurGroupManual = () => {
  const [players, setPlayers] = useState([])
  const [type, setType] = useState("")
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { id } = useParams()

  // 🔥 fetch players by category
  useEffect(() => {
    const fetchPlayers = async () => {
      if (!type) return

      try {
        setError("")
        setPlayers([])
        setSelectedPlayers([])

        const res = await AxiosToken.get(
          `/user/get/joueur/age/${type}`
        )

        setPlayers(res.data.players)

        if (res.data.players.length === 0) {
          setError("Aucun joueur disponible")
        }

      } catch (err) {
        setPlayers([])
        setError("Aucun joueur disponible")
      }
    }

    fetchPlayers()
  }, [type])

  // 🔥 select / unselect player
  const togglePlayer = (player) => {
    const exists = selectedPlayers.find(p => p.id === player.id)

    if (exists) {
      setSelectedPlayers(
        selectedPlayers.filter(p => p.id !== player.id)
      )
    } else {
      setSelectedPlayers([...selectedPlayers, player])
    }
  }

  // 🔥 submit
  const handleSubmit = async () => {
    if (selectedPlayers.length === 0) {
      setError("Sélectionnez au moins un joueur")
      return
    }

    try {
      setLoading(true)
      setError("")

      await AxiosToken.post(`/group/${id}/add/manual`, {
        players: selectedPlayers.map(p => p.id),
      })

      alert("Joueurs ajoutés avec succès")

      setSelectedPlayers([])
      setPlayers([])
      setType("")

    } catch (err) {
      console.log(err)
      setError("Erreur lors de l'ajout")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">

      <h1 className="text-2xl font-bold mb-6">
        Ajouter joueurs à un groupe
      </h1>

      {/* CATEGORY SELECT */}
      <div className="mb-4">
        <label className="text-sm font-medium">
          Catégorie
        </label>

        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value)
            setError("")
          }}
          className="border p-2 rounded w-full mt-1"
        >
          <option selected disabled value="">-- Choisir catégorie --</option>
          <option value="U4">U4</option>
          <option value="U8">U8</option>
          <option value="U12">U12</option>
          <option value="U16">U16</option>
        </select>

        {/* 🔥 ERROR MESSAGE */}
        {error && (
          <p className="text-red-500 text-sm mt-2">
            {error}
          </p>
        )}
      </div>

      {/* LIST */}
      {type && !error && (
        <div className="grid grid-cols-2 gap-4 mt-4">

          {/* AVAILABLE PLAYERS */}
          <div>
            <h2 className="font-semibold mb-2">
              Joueurs disponibles
            </h2>

            <div className="space-y-2">
              {players.map(p => (
                <div
                  key={p.id}
                  onClick={() => togglePlayer(p)}
                  className={`p-2 border rounded cursor-pointer transition
                    ${selectedPlayers.find(s => s.id === p.id)
                      ? "bg-yellow-200"
                      : "hover:bg-gray-100"
                    }`}
                >
                  {p.nom} {p.prenom}
                </div>
              ))}
            </div>
          </div>

          {/* SELECTED PLAYERS */}
          <div>
            <h2 className="font-semibold mb-2">
              Sélectionnés ({selectedPlayers.length})
            </h2>

            <div className="space-y-2">
              {selectedPlayers.map(p => (
                <div
                  key={p.id}
                  className="p-2 bg-yellow-100 border rounded"
                >
                  {p.nom} {p.prenom}
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded"
        >
          {loading
            ? "Enregistrement..."
            : "Ajouter au groupe"}
        </button>

    </div>
  )
}

export default AddJoueurGroupManual