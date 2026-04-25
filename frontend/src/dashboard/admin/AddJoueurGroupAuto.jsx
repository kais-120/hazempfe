import { useEffect, useState } from "react"
import { AxiosToken } from "../../Api/Api"

const AddJoueurGroupAuto = () => {
  const [groups, setGroups] = useState([])
  const [groupId, setGroupId] = useState("")
  const [type, setType] = useState("")
  const [count, setCount] = useState(0)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchGroups = async () => {
      const res = await AxiosToken.get("/group")
      setGroups(res.data.groups)
    }

    fetchGroups()
  }, [])

  // 🔥 submit
  const handleSubmit = async () => {
    if (!groupId || !type || !count) {
      alert("Remplir tous les champs")
      return
    }

    try {
      setLoading(true)

      const res = await AxiosToken.post(
        `/group/${groupId}/add-joueurs-auto`,
        {
          type,
          count: Number(count),
        }
      )

      alert(res.data.message)

      setType("")
      setCount(0)

    } catch (err) {
      console.log(err)
      alert(err.response?.data?.message || "Erreur")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">

      <h1 className="text-2xl font-bold mb-6">
        Ajout automatique de joueurs
      </h1>

      {/* GROUP */}
      <div className="mb-4">
        <label>Groupe</label>
        <select
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">-- choisir groupe --</option>
          {groups.map(g => (
            <option key={g.id} value={g.id}>
              {g.libelle}
            </option>
          ))}
        </select>
      </div>

      {/* CATEGORY */}
      <div className="mb-4">
        <label>Catégorie</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">-- choisir catégorie --</option>
          <option value="U4">U4</option>
          <option value="U8">U8</option>
          <option value="U12">U12</option>
          <option value="U16">U16</option>
        </select>
      </div>

      {/* COUNT */}
      <div className="mb-4">
        <label>Nombre de joueurs</label>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded"
      >
        {loading ? "Ajout..." : "Ajouter automatiquement"}
      </button>

    </div>
  )
}

export default AddJoueurGroupAuto