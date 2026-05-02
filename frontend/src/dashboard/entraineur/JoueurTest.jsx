import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AxiosToken } from '../../Api/Api'

const JoueurTest = () => {
  const location = useLocation()
  const [joueurs, setJoueurs] = useState([])
  const [joueursStatus, setJoueursStatus] = useState([])
  const [error, setError] = useState(false)
  const navigate = useNavigate();
  const handleChange = (id, value) => {
  setJoueursStatus(prev => {
    const exist = prev.find(j => j.id === id)

    if (exist) {
      // update
      return prev.map(j =>
        j.id === id ? { ...j, status: value } : j
      )
    } else {
      // add new
      return [...prev, { id, status: value }]
    }
  })
}

  useEffect(() => {
    const testingData = async () => {
      try {
        const res = await AxiosToken.post(
          "/testing/entraineur/list/joueur",
          location.state
        )

        setJoueurs(res.data.Joueurs)
      } catch (err) {
        console.log(err)
      }
    }

    testingData()
  }, [])

  const handleSave = async () => {
  try {
    setError(false)
    if(joueursStatus.length !== joueurs.length){setError(true);return}
    await AxiosToken.put("/testing/update-status", {
      joueurs:joueursStatus
    })

    alert("Modifications enregistrées ✅")
    navigate(-1)
  } catch (err) {
    console.log(err)
    alert("Erreur ❌")
  }
}


  if (!joueurs.length) {
    return <p className="p-6">Chargement...</p>
  }
  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Liste des joueurs
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border">

          {/* HEADER */}
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">#</th>
              <th className="p-3 border">Joueur</th>
              <th className="p-3 border">Statut</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {joueurs.map((j,index) => (
              <tr key={j.id} className="hover:bg-gray-50">

                <td className="p-3 border">{index + 1}</td>

                <td className="p-3 border">
                  {j.joueurTester.nom + " " + j.joueurTester.prenom}
                </td>

                <td className="p-3 border">
                  <select
                    className="border p-1 rounded"
                    value={
                        joueursStatus.find(s => s.id === j.id)?.status || ""
                            }
                    onChange={(e) =>
                      handleChange(j.id, e.target.value)
                    }
                  >
                    <option value="">Choisir</option>
                    <option value="absent">Absent</option>
                    <option value="débutant">Débutant</option>
                    <option value="intermédiaire">Intermédiaire</option>
                    <option value="avancé">Avancé</option>
                  </select>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
        <div className="flex justify-end mt-4">
  <button
    onClick={handleSave}
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  >
    Enregistrer
  </button>
</div>
      </div>
      {error && <span className=' text-red-600'>il faut selection touts le joueurs</span>}
    </div>
  )
}

export default JoueurTest