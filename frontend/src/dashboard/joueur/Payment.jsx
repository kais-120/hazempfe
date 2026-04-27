import { useState } from "react";

const Payment = () => {
  const today = new Date().toISOString().split("T")[0];

  const [payments] = useState([
    {
      id: 1,
      date: "2026-04-01",
      amount: 70,
      method: "Cash",
      status: "paid",
    },
    {
      id: 2,
      date: today,
      amount: 50,
      method: "Card",
      status: "paid", 
    },
  ]);

  const todayPayment = payments.find(p => p.date === today);

  const getStatusColor = (status) => {
    if (status === "paid") return "text-green-400";
    if (status === "pending") return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="p-6 text-white space-y-6">

      {/* 🔥 Today Status */}
      <div className="bg-black/40 p-5 rounded-xl">

        {!todayPayment && (
          <div>
            <p className="text-white/60">📅 Aucun paiement aujourd’hui</p>
            <p className="text-sm mt-1">Prochaine échéance: 2026-04-30</p>
          </div>
        )}

        {todayPayment?.status === "paid" && (
          <div>
            <p className="text-green-400 font-semibold">
              ✅ Paiement effectué aujourd’hui
            </p>
            <p className="text-sm mt-1">
              Montant: {todayPayment.amount} TND
            </p>
          </div>
        )}

        {todayPayment?.status === "pending" && (
          <div className="flex justify-between items-center">
            <div>
              <p className="text-yellow-400 font-semibold">
                ⚠️ Paiement dû aujourd’hui
              </p>
              <p className="text-sm mt-1">
                Montant: {todayPayment.amount} TND
              </p>
            </div>

            <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300">
              Payer maintenant
            </button>
          </div>
        )}
      </div>

      {/* 📋 Historique */}
      <div className="bg-black/40 p-4 rounded-xl">
        <h2 className="mb-4 text-lg font-semibold">Historique</h2>

        <div className="space-y-3">
          {payments.map((p) => (
            <div
              key={p.id}
              className="flex justify-between items-center border-b border-white/10 pb-2"
            >
              <div>
                <p className="text-sm">{p.date}</p>
                <p className="text-xs text-white/50">{p.method}</p>
              </div>

              <div className="text-right">
                <p>{p.amount} TND</p>
                <p className={`text-xs ${getStatusColor(p.status)}`}>
                  {p.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Payment