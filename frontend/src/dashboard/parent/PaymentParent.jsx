import { useEffect, useState } from "react";
import { AxiosToken } from "../../Api/Api";

const PaymentParent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AxiosToken.get("/payment/parent");
        setData(res.data);
      } catch {
        console.error("error");
      }
    };

    fetchData();
  }, []);

  // 🟢 Pay one child
  const payChild = (childId) => {
    console.log("pay child", childId);
  };

  // 🔵 Pay all children
  const payAll = () => {
    console.log("pay all");
  };

  return (
    <div className="p-6 text-white space-y-6 bg-gray-900 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Paiement</h1>

        <button
          onClick={payAll}
          className="bg-green-500 px-4 py-2 rounded-lg font-semibold hover:bg-green-400"
        >
          Pay All Children
        </button>
      </div>

      {/* TOTAL */}
      <div className="bg-black/40 p-3 rounded-lg">
        <p>Total Debt: {data?.totalDebt} TND</p>
      </div>

      {/* CHILDREN */}
      <div className="space-y-4">

        {data?.children?.map((child) => (
          <div
            key={child.childId}
            className="bg-black/40 p-4 rounded-xl border border-white/10"
          >

            {/* CHILD HEADER */}
            <div className="flex justify-between items-center">

              <div>
                <h2 className="text-lg font-semibold">
                  {child.nom} {child.prenom}
                </h2>

                <p className="text-sm text-white/60">
                  Debt: {child.childDebt} TND
                </p>
              </div>

              <button
                onClick={() => payChild(child.childId)}
                className="bg-yellow-400 text-black px-3 py-1 rounded-lg font-semibold hover:bg-yellow-300"
              >
                Pay Child
              </button>

            </div>

            {/* MONTHS */}
            <div className="mt-3 space-y-2">

              {child.unpaidMonths.map((sub, index) => (
                <div
                  key={index}
                  className="flex justify-between text-sm border-b border-white/10 pb-1"
                >
                  <span>{sub.month}</span>
                  <span>{sub.amount} TND</span>
                  <span className="text-red-400">
                    unpaid
                  </span>
                </div>
              ))}

            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default PaymentParent;