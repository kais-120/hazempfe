import { useEffect, useState } from "react";
import { AxiosToken } from "../../Api/Api";

const Payment = () => {
  const today = new Date().toISOString().split("T")[0];
  const [price,setPrice] = useState(null)

  const [payments,setPayments] = useState([]);

  const todayPayment = payments.find(p => p.date === today);

  const getStatusColor = (status) => {
    if (status === "paid") return "text-green-400";
    if (status === "pending") return "text-yellow-400";
    return "text-red-400";
  };
  useEffect(()=>{
    const paymentData = async () => {
        try{
            const res = await AxiosToken.get("/payment/verify");
            setPrice(res.data)
        }catch{
            console.error("error")
        }
    }
    paymentData()
  },[])
  useEffect(()=>{
    const paymentData = async () => {
        try{
            const res = await AxiosToken.get("/payment/history");
           setPayments(res.data.payment)
        }catch{
            console.error("error")
        }
    }
    paymentData()
  },[])
  return (
    <div className="p-6 text-white space-y-6">

  <div className="bg-black/40 p-5 rounded-xl">

  {!price?.paid && (
    <div className="flex justify-between items-center">
      <div>
        <p className="text-yellow-400 font-semibold">
          ⚠️ Paiement non effectué
        </p>
        <p className="text-sm mt-1">
          Montant: {price?.totalDebt} TND
        </p>
      </div>

      <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300">
        Payer maintenant
      </button>
    </div>
  )}

  {/* ✅ PAID */}
  {price?.paid && (
    <div>
      <p className="text-green-400 font-semibold">
        ✔ Paiement effectué
      </p>
      <p className="text-sm mt-1">
        Montant: 0 TND
      </p>
    </div>
  )}

</div>

      {/* 📋 Historique */}
      <div className="bg-black/40 p-4 rounded-xl">
        <h2 className="mb-4 text-lg font-semibold">Historique</h2>

        <div className="space-y-3">
          {payments && payments.length === 0 ?
           <div
              className="flex justify-between items-center border-b border-white/10 pb-2"
            >
                <p className="text-xs text-white/50">Aucun des Historique</p>
              </div>
           :payments.map((p) => (
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