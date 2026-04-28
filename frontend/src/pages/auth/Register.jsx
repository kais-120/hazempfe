import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { Axios } from "../../Api/Api";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const validationSchema = Yup.object({
    nom: Yup.string().required("Nom obligatoire"),
    prenom: Yup.string().required("Prénom obligatoire"),

    email: Yup.string()
        .email("Email invalide")
        .required("Email obligatoire"),

    role: Yup.string().required("Rôle obligatoire"),

    password: Yup.string()
        .min(6, "Minimum 6 caractères")
        .required("Mot de passe obligatoire"),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas")
        .required("Confirmation obligatoire"),

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

 function Input({ label, name, type = "text", formik,emailError,phoneError,emailPhoneError }) {
        return (
            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-slate-700">{label}</label>

                <input
                    name={name}
                    type={type}
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="p-3 rounded-lg border bg-slate-50 focus:ring-2 focus:ring-yellow-400 outline-none"
                    max={
                        name === "dateNaissance"
                            ? new Date(new Date().setFullYear(new Date().getFullYear() - 4))
                                .toISOString()
                                .split("T")[0]
                            : undefined
                    }
                />

                {formik.touched[name] && formik.errors[name] && (
                    <p className="text-red-500 text-sm">{formik.errors[name]}</p>
                )}
                 {(emailError) && (
                    <p className="text-red-500 text-sm">Email déja existe</p>
                )}
                {(phoneError) && (
                    <p className="text-red-500 text-sm">numéro de télèphone déja existe</p>
                )}
               
            </div>
        );
    }
    function Select({ label, name, options, formik }) {
        return (
            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-slate-700">{label}</label>

                <select
                    name={name}
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="p-3 rounded-lg border bg-slate-50 focus:ring-2 focus:ring-yellow-400 outline-none"
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>

                {formik.touched[name] && formik.errors[name] && (
                    <p className="text-red-500 text-sm">{formik.errors[name]}</p>
                )}
            </div>
        );
    }
    function Password({ label, name, show, setShow, formik }) {
        return (
            <div className="flex flex-col gap-1 relative">
                <label className="text-sm font-semibold text-slate-700">{label}</label>

                <input
                    name={name}
                    type={show ? "text" : "password"}
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="p-3 rounded-lg border bg-slate-50 pr-10"
                />

                <span
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-9 cursor-pointer text-slate-500"
                >
                    {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>

                {formik.touched[name] && formik.errors[name] && (
                    <p className="text-red-500 text-sm">{formik.errors[name]}</p>
                )}
            </div>
        );
    }

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [emailError,setEmailError] = useState(false);
    const [phoneError,setPhoneError] = useState(false);

    const formik = useFormik({
        initialValues: {
            nom: "",
            prenom: "",
            email: "",
            role: "",
            groupId: "",
            password: "",
            confirmPassword: "",
            addresse: "",
            num_tel: "",
            dateNaissance: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                setIsLoading(true);
                setEmailError(false)
                setPhoneError(false)
                await Axios.post("/auth/register", values);
                setTimeout(()=>{
                    navigate("/login")
                },2000)
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
            } finally {
                setIsLoading(false);
            }
        }
    })
    console.log(formik.errors)



    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-10">

            <div className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-2xl animate-[fadeIn_0.4s_ease]">

                {/* HEADER */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-900">
                        Rejoignez les Stars
                    </h2>
                    <p className="text-slate-500 mt-1">
                        Créez votre compte pour accéder à l'Académie
                    </p>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-5">

                    {/* ROW 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <Input label="Nom" name="nom" formik={formik} />
                        <Input label="Prénom" name="prenom"  formik={formik} />

                    </div>

                    {/* EMAIL */}
                    <Input label="Email" emailError={emailError} name="email" type="email"  formik={formik} />

                    {/* ROLE + GROUP */}
                    <div>

                        <Select
                            label="Type de compte"
                            name="role"
                             formik={formik}

                            options={[
                                { value: "", label: "Choisir un rôle" },
                                { value: "joueur", label: "Joueur" },
                                { value: "parent", label: "Parent" },
                            ]}
                        />

                    </div>

                    {/* PASSWORD */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <Password
                            label="Mot de passe"
                            name="password"
                            show={showPassword}
                            setShow={setShowPassword}
                             formik={formik}
                        />

                        <Password
                            label="Confirmer"
                            name="confirmPassword"
                            show={showConfirmPassword}
                            setShow={setShowConfirmPassword}
                             formik={formik}
                        />

                    </div>

                    {/* ADDRESS + PHONE */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <Input label="Addresse" name="addresse"  formik={formik} />
                        <Input label="Téléphone" phoneError={phoneError}  name="num_tel"  formik={formik} />

                    </div>

                    {/* DATE */}
                    <Input
                        label="Date de naissance"
                        name="dateNaissance"
                        type="date"
                         formik={formik}
                    />

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold uppercase tracking-wide hover:bg-slate-800 hover:-translate-y-0.5 transition"
                    >
                        {isLoading ? "S'inscrire en cours ..." : "S'inscrire à l'Académie"}
                    </button>

                    <p className="text-center text-sm text-slate-500 mt-4">
                        Déjà membre ?{" "}
                        <a href="/login" className="text-yellow-500 font-semibold hover:underline">
                            Se connecter
                        </a>
                    </p>

                </form>
            </div>
        </div>
    );
}
export default Register;