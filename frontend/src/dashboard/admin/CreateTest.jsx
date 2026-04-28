import { useFormik } from "formik";
import axios from "axios";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { AxiosToken } from "../../Api/Api";

export const testSchema = Yup.object({
  date_test: Yup.date().required("Date obligatoire"),
  time_test: Yup.string().required("Heure obligatoire"),
  joueur_id: Yup.number().required(),
  entraineur_id: Yup.number().required(),
});

export default function CreateTest() {
  const [joueurs, setJoueurs] = useState([]);
  const [entraineurs, setEntraineurs] = useState([]);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

  useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await AxiosToken.get("/user/entraineur")
          setEntraineurs(res.data.users)
        } catch (err) {
          console.log(err)
        }
      }
  
      fetchData()
    }, [])
  

//   const fetchUsers = async () => {
//     const j = await axios.get("/users?role=joueur");
//     const e = await axios.get("/users?role=entraineur");

//     setJoueurs(j.data);
//   };

  const formik = useFormik({
    initialValues: {
      date_test: "",
      time_test: "",
      joueur_id: "",
      entraineur_id: "",
    },
    validationSchema: testSchema,
    onSubmit: async (values) => {
      await axios.post("/test-joueur", values);
      alert("Test créé ✅");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="p-4 space-y-3">

      <input
        type="date"
        name="date_test"
        onChange={formik.handleChange}
        className="border p-2 w-full"
      />

      <input
        type="time"
        name="time_test"
        onChange={formik.handleChange}
        className="border p-2 w-full"
      />

      <select name="joueur_id" onChange={formik.handleChange}>
        <option value="">Choisir joueur</option>
        {joueurs.map(j => (
          <option key={j.id} value={j.id}>{j.name}</option>
        ))}
      </select>

      <select name="entraineur_id" onChange={formik.handleChange}>
        <option value="">Choisir entraîneur</option>
        {entraineurs.map(e => (
          <option key={e.id} value={e.id}>{e.nom + " " + e.prenom}</option>
        ))}
      </select>

      <button className="bg-blue-500 text-white px-4 py-2">
        Ajouter
      </button>
    </form>
  );
}