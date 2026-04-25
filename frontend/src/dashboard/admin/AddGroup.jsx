import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AxiosToken } from "../../Api/Api"
import { useFormik } from "formik"

const AddGroupe = () => {
  const navigate = useNavigate()

  const [entraineurs, setEntraineurs] = useState([])
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState(null)

  const [loading, setLoading] = useState(false)

  // GET ENTRAINEURS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AxiosToken.get("/user/entraineur")
        setEntraineurs(res.data.users)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])

  const filtered = entraineurs.filter((e) =>
    `${e.nom} ${e.prenom}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  const formik = useFormik({
    initialValues:{
        libelle:"",
        entraineur_id :null,
        type:""
    },
    onSubmit : async (values) => {
        console.log(values)
    try {
      setLoading(true)

      await AxiosToken.post("/group/add",values)

      alert("Groupe ajouté avec succès")
      navigate("/dashboard/groupes")
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  })


  

  return (
    <div className="max-w-2xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">
        Ajouter un groupe
      </h1>

      <form onSubmit={formik.handleSubmit} className="space-y-5 bg-white p-6 rounded-lg shadow">

        {/* LIBELLE */}
        <div>
          <label className="text-sm text-gray-600">Libellé</label>
          <input
          name="libelle"
            value={formik.values.libelle}
            onChange={formik.handleChange}
            className="w-full border p-2 rounded mt-1"
            required
          />
        </div>
        <div><label className="text-sm text-gray-600">catégorie</label>
         <select
          value={formik.values.type}
          name="type"
          onChange={formik.handleChange}
          className="border p-2 rounded w-full mt-1"
        >
          <option selected disabled value="">-- Choisir catégorie --</option>
          <option value="U4">U4</option>
          <option value="U8">U8</option>
          <option value="U12">U12</option>
          <option value="U16">U16</option>
        </select>
        </div>

        {/* SEARCH ENTRAINEUR */}
        <div>
          <label className="text-sm text-gray-600">
            Choisir entraîneur
          </label>

          <input
            placeholder="Rechercher nom ou prénom..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border p-2 rounded mt-1"
          />
         

          {/* LIST */}
          <div className="border rounded mt-2 max-h-40 overflow-y-auto">
            {filtered.map((e) => (
              <div
                key={e.id}
                onClick={() => {
                  formik.setFieldValue("entraineur_id",e.id)
                  setSearch(`${e.nom} ${e.prenom}`)
                }}
                className={`p-2 cursor-pointer hover:bg-yellow-100 ${
                  selected?.id === e.id ? "bg-yellow-200" : ""
                }`}
              >
                {e.nom} {e.prenom}
              </div>
            ))}
          </div>

        </div>

        {/* SELECTED */}
        {selected && (
          <div className="text-sm text-green-600">
            Sélectionné: {selected.nom} {selected.prenom}
          </div>
        )}

        {/* BUTTON */}
        <button
          disabled={loading}
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded w-full"
        >
          {loading ? "Création..." : "Créer groupe"}
        </button>

      </form>

    </div>
  )
}

export default AddGroupe