import { useEffect, useState } from "react";
import { AxiosToken } from "../../Api/Api";

export default function PlayersPaymentStatus() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await AxiosToken.get("/payment/players-status");
      setPlayers(res.data.users);
    } catch (err) {
      console.log(err);
      alert("Erreur de chargement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 text-white">

      <h2 className="text-xl font-semibold mb-6">
        Statut des paiements des joueurs
      </h2>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="overflow-x-auto bg-black/40 rounded-xl">
          <table className="w-full text-sm">

            <thead className="bg-white/10">
              <tr>
                <th className="p-3 text-left">Nom</th>
                <th className="p-3 text-left">Prénom</th>
                <th className="p-3 text-left">Statut</th>
                <th className="p-3 text-left">Date paiement</th>
              </tr>
            </thead>

            <tbody>
              {players.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-white/10 hover:bg-white/5"
                >
                  <td className="p-3">{p.nom}</td>
                  <td className="p-3">{p.prenom}</td>

                  {/* STATUS */}
                  <td className="p-3">
                    {p.paid ? (
                      <span className="text-green-400 font-semibold">
                        ✔ Payé
                      </span>
                    ) : (
                      <span className="text-red-400 font-semibold">
                        ✖ Non payé
                      </span>
                    )}
                  </td>

                  {/* DATE */}
                  <td className="p-3 text-white/70">
                    {p.paymentDate
                      ? new Date(p.paymentDate).toLocaleDateString()
                      : "-"}
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