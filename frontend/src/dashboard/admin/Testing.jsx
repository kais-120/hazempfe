import { useEffect, useState } from "react";
import { AxiosToken } from "../../Api/Api";
import { useNavigate } from "react-router-dom";

export default function Testing() {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const res = await AxiosToken.get("/test-joueur");
      setTests(res.data.tests);
    } catch {
      console.error("Erreur");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await AxiosToken.put(`/test-joueur/${id}`, { status });
      fetchTests();
    } catch {
      console.error("Erreur update status");
    }
  };

  const handleAdd = () => {
    navigate("add");
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Tests Joueurs</h2>

        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          + Ajouter Test
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Date</th>
            <th>Heure</th>
            <th>Joueur</th>
            <th>Entraîneur</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {tests && tests.length > 0 ? (
            tests.map((t) => (
              <tr key={t.id}>
                <td>{t.date_test}</td>
                <td>{t.time_test}</td>
                <td>{t.joueur?.name}</td>
                <td>{t.entraineur?.name}</td>

                <td>
                  <select
                    value={t.status}
                    onChange={(e) =>
                      handleStatusChange(t.id, e.target.value)
                    }
                    className="border p-1 rounded"
                  >
                    <option value="programmé">Programmé</option>
                    <option value="done">Terminé</option>
                    <option value="accepté">Accepté</option>
                    <option value="absent">Absent</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center p-6">
                <p className="mb-3">Aucun test disponible</p>

                <button
                  onClick={handleAdd}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Ajouter un test
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}