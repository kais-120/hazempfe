import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosToken } from "../../Api/Api";

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const res = await AxiosToken.get("/pricing");
      setCategories(res.data.categories || res.data);
    } catch{
      console.error("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-6 text-white">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          Catégories de tarification
        </h2>

        <button
          onClick={() => navigate("add")}
          className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300"
        >
          + Ajouter
        </button>
      </div>

      {loading ? (
        <p>Chargement...</p>
      ) : categories.length === 0 ? (
        <p className="text-white/60">Aucune catégorie trouvée</p>
      ) : (
        <div className="overflow-x-auto bg-black/40 rounded-xl">
          <table className="w-full text-sm">

            <thead className="bg-white/10">
              <tr>
                <th className="p-3 text-left">Nom</th>
                <th className="p-3 text-left">Âge min</th>
                <th className="p-3 text-left">Âge max</th>
                <th className="p-3 text-left">Prix</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((cat) => (
                <tr
                  key={cat.id}
                  className="border-b border-white/10 hover:bg-white/5"
                >
                  <td className="p-3">{cat.libelle}</td>
                  <td className="p-3">{cat.min_age}</td>
                  <td className="p-3">{cat.max_age}</td>
                  <td className="p-3 text-yellow-400">
                    {cat.price} TND
                  </td>

                  <td className="p-3 flex gap-3">
                    <button className="text-blue-400 hover:underline">
                      Modifier
                    </button>

                    <button
                      onClick={async () => {
                        const confirmDelete = window.confirm(
                          "Supprimer cette catégorie ?"
                        );
                        if (!confirmDelete) return;

                        try {
                          await AxiosToken.delete(`/category/${cat.id}`);
                          setCategories((prev) =>
                            prev.filter((c) => c.id !== cat.id)
                          );
                        } catch {
                          alert("Erreur lors de la suppression");
                        }
                      }}
                      className="text-red-400 hover:underline"
                    >
                      Supprimer
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}