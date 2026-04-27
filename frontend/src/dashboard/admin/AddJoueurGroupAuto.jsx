import { useEffect, useState } from "react"
import { AxiosToken } from "../../Api/Api"
import { useNavigate, useParams } from "react-router-dom"

const AddJoueurGroupAuto = () => {
  const [groupAge, setGroupAge] = useState("")
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await AxiosToken.get(
          `/group/get/${id}`
        )
        setGroupAge(res.data.group)

      } catch (err) {
        navigate(-1)
      }
    }
    fetchGroup()
  },[id,navigate])


  const handleSubmit = async () => {
    if (!count) {
      alert("Remplir tous les champs")
      return
    }

    try {
      setLoading(true)

      const res = await AxiosToken.post(
        `/group/${id}/add-joueurs-auto`,
        {
          type:groupAge.type,
          count: Number(count),
        }
      )

      alert(res.data.message)

      setCount(0)

    } catch (err) {
      console.log(err)
      alert("Pas assez de joueurs disponibles")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Ajout automatique de joueurs pour groupe {groupAge.libelle}
      </h1>

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