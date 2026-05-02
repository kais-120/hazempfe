import React, { useEffect, useState } from 'react'
import { AxiosToken } from '../../Api/Api'
import { useNavigate } from 'react-router-dom'

const EntraineurTesting = () => {
  const [tests, setTests] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const testingData = async () => {
      try {
        const res = await AxiosToken.get("/testing/entraineur")
        setTests(res.data.test)
      } catch (err) {
        console.log(err)
      }
    }

    testingData()
  }, [])

  if (!tests.length) {
    return <p className="p-6">Chargement...</p>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Planning des tests
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">

          {/* HEADER */}
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border text-left">Date</th>
              <th className="p-3 border text-left">Heure</th>
              <th className="p-3 border text-center">Nombre de joueurs</th>
              <th className="p-3 border text-center">Action</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {tests.map((t, index) => (
              <tr key={index} className="hover:bg-gray-50">

                <td className="p-3 border">
                  {t.date_test}
                </td>

                <td className="p-3 border">
                  {t.time_test}
                </td>

                <td className="p-3 border text-center font-semibold">
                  {t.tests.length}
                </td>
                <td className="p-3 border text-center font-semibold">
                  <button onClick={()=>navigate("joueurs",{state:{time_test:t.time_test,date_test:t.date_test}})} className=' bg-blue-500 p-2 rounded-md text-stone-50'>
                      Voir
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default EntraineurTesting