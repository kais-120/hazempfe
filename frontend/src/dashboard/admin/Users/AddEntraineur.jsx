import { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup";
import { useFormik } from "formik";
import { AxiosToken } from "../../../Api/Api";

export const validationSchema = Yup.object({
    nom: Yup.string().required("Nom obligatoire"),
    prenom: Yup.string().required("Prénom obligatoire"),

    email: Yup.string()
        .email("Email invalide")
        .required("Email obligatoire"),


    password: Yup.string()
        .min(6, "Minimum 6 caractères")
        .required("Mot de passe obligatoire"),


    addresse: Yup.string().required("Adresse obligatoire"),

    num_tel: Yup.string()
        .matches(/^[0-9]{8}$/, "Téléphone invalide")
        .required("Téléphone obligatoire"),

    dateNaissance: Yup.date()
        .required("Date obligatoire")
        .test("minAge", "Âge minimum 4 ans", function (value) {
            if (!value) return false;

            const age = new Date().getFullYear() - new Date(value).getFullYear();
            return age >= 4;
        }),
});

const AddEntraineur = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [emailError,setEmailError] = useState(false);
  const [phoneError,setPhoneError] = useState(false);
  const pathParts = window.location.pathname.split("/")

  const role = pathParts[3]
  const singular = role.endsWith("s") ? role.slice(0, -1) : role



  const formik = useFormik({
    initialValues:{
    nom: "",
    prenom: "",
    email: "",
    password: "",
    num_tel: "",
    addresse: "",
    role:singular,
    dateNaissance: "",
    },
    validationSchema,
    onSubmit : async (values) => {
        try{
            setLoading(true)
            setEmailError(false)
            setPhoneError(false)
            await AxiosToken.post("user/add",values);
            navigate(-1)
        }catch(err){
          const error = err.response.data.errors
          if(error.email && error.phone){
              setEmailError(true)
              setPhoneError(true)
          }else if(error.email){
            setEmailError(true)
          }else{
            setPhoneError(true)
          }
        }finally{
            setLoading(false)
        }
    }
  })

  return (
    <div className="p-6 max-w-3xl mx-auto">

      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Ajouter un {singular}
      </h1>

      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 rounded-lg shadow space-y-4"
      >

        <div className="grid grid-cols-2 gap-4">

          <Input name="nom" label="Nom" value={formik.values.nom} onChange={formik.handleChange} />
          <Input name="prenom" label="Prénom" value={formik.values.prenom} onChange={formik.handleChange} />
          <Input name="email" email={emailError}  label="Email" value={formik.values.email} onChange={formik.handleChange} />
          <Input name="password"  label="Mot de passe" type="password" value={formik.values.password} onChange={formik.handleChange} />
          <Input name="num_tel" phone={phoneError}  label="Téléphone" value={formik.values.num_tel} onChange={formik.handleChange} />
          <Input name="addresse" label="Adresse" value={formik.values.addresse} onChange={formik.handleChange} />
          <Input name="dateNaissance" label="Date de naissance" type="date" value={formik.values.dateNaissance} onChange={formik.handleChange} />

        </div>

        <div className="flex justify-end gap-3 pt-4">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
          >
            Annuler
          </button>

          <button
            disabled={loading}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-md font-medium"
          >
            {loading ? "Ajout..." : "Ajouter"}
          </button>

        </div>

      </form>

    </div>
  )
}

/* Reusable input */
function Input({ label, name, value, onChange, type = "text",phone,email }) {
  console.log(email)
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        required
      />
      {(email) && (
          <p className="text-red-500 text-sm">Email déja existe</p>
      )}
      {(phone) && (
          <p className="text-red-500 text-sm">numéro de télèphone déja existe</p>
      )}
    </div>
  )
}

export default AddEntraineur