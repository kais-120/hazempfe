import { useEffect, useState } from "react";
import { AxiosToken } from "../../Api/Api";
import { useNavigate } from "react-router-dom";

export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await AxiosToken.get("/product");
      setProducts(res.data.products);
    } catch {
      console.error("Erreur lors du chargement");
    }
  };

  // 🗑️ DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous supprimer ce produit ?")) return;

    try {
      await AxiosToken.delete(`/product/${id}`);
      fetchProducts(); // refresh
    } catch {
      console.error("Erreur suppression");
    }
  };

  // ✏️ EDIT
  const handleEdit = (id) => {
    navigate(`/products/edit/${id}`);
  };

  const handleAdd = () => {
    navigate("product/add");
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Liste des Produits</h2>

        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          + Ajouter Produit
        </button>
      </div>

      <table className="w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Image</th>
            <th className="border p-2">Titre</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Prix</th>
            <th className="border p-2">Remise</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products && products.length > 0 ? (
            products.map((p) => (
              <tr key={p.id}>
                <td className="border p-2">
                  <img
                    src={`http://localhost:5000/uploads/${p.image}`}
                    alt=""
                    className="w-16 h-16 object-cover"
                  />
                </td>

                <td className="border p-2">{p.titre}</td>
                <td className="border p-2">{p.description}</td>
                <td className="border p-2">{p.price} DT</td>
                <td className="border p-2">{p.discount}</td>

                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(p.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Modifier
                  </button>

                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center p-4">
                Aucun produit disponible
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}