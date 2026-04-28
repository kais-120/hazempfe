import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { AxiosToken } from "../../Api/Api";
import { useNavigate } from "react-router-dom";

// ✅ validation
export const testSchema = Yup.object({
  date_test: Yup.date().required("Date obligatoire"),
  time_test: Yup.string().required("Heure obligatoire"),
  entraineur_id: Yup.number().required("Choisir un entraîneur"),
  joueurs_id: Yup.array().min(1, "Choisir au moins un joueur"),
});

export default function CreateTest() {
  const [joueurs, setJoueurs] = useState([]);
  const [entraineurs, setEntraineurs] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const navigate = useNavigate();

  // 🔹 fetch joueurs
  useEffect(() => {
    const fetchJoueurs = async () => {
      try {
        const res = await AxiosToken.get("/user/joueur/no-level");
        setJoueurs(res.data.users);
      } catch {
        console.error("Erreur joueurs");
      }
    };

    fetchJoueurs();
  }, []);

  // 🔹 fetch entraineurs
  useEffect(() => {
    const fetchCoachs = async () => {
      try {
        const res = await AxiosToken.get("/user/entraineur");
        setEntraineurs(res.data.users);
      } catch {
        console.error("Erreur coachs");
      }
    };

    fetchCoachs();
  }, []);

  // 🔹 formik
  const formik = useFormik({
    initialValues: {
      date_test: "",
      time_test: "",
      joueurs_id: [],
      entraineur_id: "",
    },
    validationSchema: testSchema,
    onSubmit: async (values) => {
      try {
        await AxiosToken.post("/testing", values);
        alert("Test créé ✅");
        navigate(-1);
      } catch (err) {
        console.log(err);
      }
    },
  });

  // 🔍 filter coach
  const filtered = entraineurs.filter((e) =>
    `${e.nom} ${e.prenom}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // 🎯 toggle player
  const togglePlayer = (player) => {
    const exists = selectedPlayers.find((p) => p.id === player.id);

    let updatedPlayers;

    if (exists) {
      updatedPlayers = selectedPlayers.filter(
        (p) => p.id !== player.id
      );
    } else {
      updatedPlayers = [...selectedPlayers, player];
    }

    setSelectedPlayers(updatedPlayers);

    // ✅ important: envoyer IDs seulement
    formik.setFieldValue(
      "joueurs_id",
      updatedPlayers.map((p) => p.id)
    );
  };

  return (
    <form onSubmit={formik.handleSubmit} className="p-4 space-y-4">

      {/* DATE */}
      <div>
        <input
          type="date"
          name="date_test"
          onChange={formik.handleChange}
          value={formik.values.date_test}
          className="border p-2 w-full"
        />
        {formik.errors.date_test && (
          <p className="text-red-500 text-sm">
            {formik.errors.date_test}
          </p>
        )}
      </div>

      {/* TIME */}
      <div>
        <input
          type="time"
          name="time_test"
          onChange={formik.handleChange}
          value={formik.values.time_test}
          className="border p-2 w-full"
        />
        {formik.errors.time_test && (
          <p className="text-red-500 text-sm">
            {formik.errors.time_test}
          </p>
        )}
      </div>

      {/* COACH */}
      <div>
        <label className="text-sm text-gray-600">
          Choisir entraîneur
        </label>

        <input
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-2 rounded mt-1"
        />

        <div className="border rounded mt-2 max-h-40 overflow-y-auto">
          {filtered.map((e) => (
            <div
              key={e.id}
              onClick={() => {
                formik.setFieldValue("entraineur_id", e.id);
                setSelectedCoach(e);
                setSearch(`${e.nom} ${e.prenom}`);
              }}
              className={`p-2 cursor-pointer hover:bg-yellow-100 ${
                selectedCoach?.id === e.id
                  ? "bg-yellow-200"
                  : ""
              }`}
            >
              {e.nom} {e.prenom}
            </div>
          ))}
        </div>

        {formik.errors.entraineur_id && (
          <p className="text-red-500 text-sm">
            {formik.errors.entraineur_id}
          </p>
        )}
      </div>

      {/* PLAYERS */}
      <div className="grid grid-cols-2 gap-4 mt-4">

        {/* LEFT */}
        <div>
          <h2 className="font-semibold mb-2">
            Joueurs disponibles
          </h2>

          <div className="space-y-2 max-h-60 overflow-y-auto">
            {joueurs.map((p) => (
              <div
                key={p.id}
                onClick={() => togglePlayer(p)}
                className={`p-2 border rounded cursor-pointer transition
                  ${
                    selectedPlayers.find((s) => s.id === p.id)
                      ? "bg-yellow-200"
                      : "hover:bg-gray-100"
                  }`}
              >
                {p.nom} {p.prenom}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <h2 className="font-semibold mb-2">
            Sélectionnés ({selectedPlayers.length})
          </h2>

          <div className="space-y-2 max-h-60 overflow-y-auto">
            {selectedPlayers.map((p) => (
              <div
                key={p.id}
                className="p-2 bg-yellow-100 border rounded"
              >
                {p.nom} {p.prenom}
              </div>
            ))}
          </div>
        </div>
      </div>

      {formik.errors.joueurs_id && (
        <p className="text-red-500 text-sm">
          {formik.errors.joueurs_id}
        </p>
      )}

      {/* SUBMIT */}
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Ajouter Test
      </button>
    </form>
  );
}