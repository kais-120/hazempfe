import { useFormik } from 'formik';
import React, { useState } from 'react'
import * as Yup from "yup";
import { Axios } from '../../Api/Api';
import { Eye, EyeOff } from 'lucide-react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Email invalide")
        .required("Email obligatoire"),

    password: Yup.string()
        .required("Mot de passe obligatoire"),
});
function Input({ label, name, type = "text", formik }) {
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
const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const cookie = new Cookies();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                setIsLoading(true)
                setError("")
                const res = await Axios.post("/auth/login",values);
                cookie.set("auth",res.data.token);
                setTimeout(()=>{
                    navigate("/dashboard",{replace:true})
                    window.location.reload()
                },2000)
                setSuccess("Connexion réussie");
            } catch {
                setError("Erreur login")
                setIsLoading(false)
            }
        }
    })
    return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-10">

            <div className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-2xl animate-[fadeIn_0.4s_ease]">

                {/* HEADER */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-900">
                        Connexion
                    </h2>
                    <p className="text-slate-500 mt-1">
                        Connectez-vous à votre compte
                    </p>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-5">

                    <Input label="Email" name="email" type="email"  formik={formik} />

                    <div className="">

                        <Password
                            label="Mot de passe"
                            name="password"
                            show={showPassword}
                            setShow={setShowPassword}
                             formik={formik}
                        />

                    </div>
    
                    <button
                        type="submit"
                        className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold uppercase tracking-wide hover:bg-slate-800 hover:-translate-y-0.5 transition"
                    >
                        {isLoading ? "Connexion..." : "Se connecter"}
                    </button>

                    <p className="text-center text-sm text-slate-500 mt-4">
                        Vous n'avez pas de compte ? {" "}
                        <a href="/login" className="text-yellow-500 font-semibold hover:underline">
                            S'inscrire
                        </a>
                    </p>
                        {success &&
                        <div class="bg-green-100 text-green-700 p-2 rounded-lg text-center mt-4">
                            { success }
                            </div>
                        }

                        {error && (
                            <div className="bg-red-100 text-red-700 p-2 rounded-lg text-center mt-4">
                                {error}
                            </div>
                            )}
                </form>
            </div>
        </div>
    )
}

export default Login