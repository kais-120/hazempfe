import React, { useState } from 'react'
import logoAcademy  from "../../assets/images/logoAcademy.png"
import { useProfile } from '../../utils/context/useProfile'
import Cookies from 'universal-cookie';

const Header = () => {
    const {user} = useProfile();
    const cookie = new Cookies()
    const [menuOpen,setMenuOpen] = useState(false)
    const toggleMenu = () => {
        setMenuOpen(prev => !prev)
    }
    const logout = () => {
        cookie.remove("auth");
        if(user?.role !== "parent"){
            window.localStorage.removeItem("child")
        }
        window.location.reload();
    }
    return (
        <nav className="fixed top-0 left-0 w-full z-50 border-b border-yellow-500/20 bg-black/90 backdrop-blur-md text-white">

            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center">

                {/* left spacer */}
                <div className="hidden md:block flex-1" />

                {/* MENU */}
                <ul className="hidden md:flex items-center gap-2 text-sm font-medium uppercase tracking-wide flex-1 justify-center">
                    <NavItem href="#accueil">Accueil</NavItem>
                    <NavItem href="#concept">Concept</NavItem>
                    <NavItem href="#activites">Activités</NavItem>
                    <NavItem href="#planning">Planning</NavItem>
                    <NavItem href="#contact">Contact</NavItem>
                    <NavItem href="#boutique">Boutique</NavItem>
                    <NavItem href="#galerie">Galerie</NavItem>
                </ul>

                {/* RIGHT SIDE */}
                <div className="flex-1 flex justify-end items-center gap-3 relative">

                    {!user ? (
                        <>
                            <a
                                href="/login"
                                className="px-4 py-2 text-sm border border-white/40 rounded-full hover:border-yellow-400 hover:text-yellow-400 transition"
                            >
                                Login
                            </a>

                            <a
                                href="/inscription"
                                className="px-4 py-2 text-sm bg-yellow-500 text-black rounded-full hover:bg-yellow-600 transition shadow-md"
                            >
                                S'inscrire
                            </a>
                        </>
                    ) : (
                        <div className="relative z-10">

                            {/* Avatar */}
                            <div
                                onClick={toggleMenu}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 text-black font-bold cursor-pointer hover:scale-105 transition"
                            >
                                {user.nom.charAt(0).toUpperCase()}
                            </div>

                            {/* Dropdown */}
                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded-xl shadow-lg border border-black/10 p-3">

                                    <div className="border-b pb-2 mb-2">
                                        <p className="font-semibold">{user.nom}</p>
                                        <p className="text-xs text-black/60">
                                            {user.role === "ADMIN" ? "administrateur" : user.role.toLowerCase()}
                                        </p>
                                    </div>

                                    <a href="/dashboard" className="block px-2 py-2 rounded hover:bg-yellow-100">
                                        Tableau de bord
                                    </a>

                                    <a href="/parametres" className="block px-2 py-2 rounded hover:bg-yellow-100">
                                        Paramètres
                                    </a>

                                    <button
                                        onClick={logout}
                                        className="w-full text-left px-2 py-2 rounded text-red-600 hover:bg-red-50"
                                    >
                                        Déconnexion
                                    </button>

                                </div>
                            )}
                        </div>
                    )}

                    {/* LOGO */}
                    <img
                        src={logoAcademy}
                        className="hidden md:block absolute right-2 top-20 w-20 h-20 object-contain"
                        alt="logo"
                    />

                </div>

            </div>
        </nav>
    );
}

/* small reusable component */
function NavItem({ href, children }) {
    return (
        <li>
            <a
                href={href}
                className="px-3 py-2 rounded-full text-white/70 hover:text-white hover:bg-yellow-500/10 transition"
            >
                {children}
            </a>
        </li>
    )
}

export default Header