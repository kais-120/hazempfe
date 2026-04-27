import { useEffect, useState } from "react"
import { AxiosToken } from "../../Api/Api"
import { Link } from "react-router-dom"
import { Pen, Trash2, Plus, Users, Phone, Calendar, Clock } from "lucide-react"

const ListGroupes = () => {
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)
  const [hoveredGroup, setHoveredGroup] = useState(null)

  useEffect(() => {
    fetchGroups()
  }, [])

  const fetchGroups = async () => {
    try {
      setLoading(true)
      const res = await AxiosToken.get("/group")
      setGroups(res.data.groups)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce groupe ?")) {
      try {
        await AxiosToken.delete(`/group/${id}`)
        setGroups(groups.filter(g => g.id !== id))
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        .title-text {
          font-family: 'Poppins', sans-serif;
        }

        .card-group {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }

        .card-group::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.5s;
        }

        .card-group:hover::before {
          left: 100%;
        }

        .card-group:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3);
        }

        .btn-accent {
          position: relative;
          overflow: hidden;
        }

        .btn-accent::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .btn-accent:hover::before {
          width: 300px;
          height: 300px;
        }

        .loading-shimmer {
          animation: shimmer 2s infinite;
          background: linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.3), rgba(255,255,255,0.1));
          background-size: 200% 100%;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .fade-in {
          animation: fadeIn 0.6s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .badge-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .text-gradient {
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-12 fade-in">
        <div>
          <h1 className="title-text text-4xl md:text-5xl font-bold text-white mb-2">
            Gestion des groupes
          </h1>
          <p className="text-slate-400 text-lg">
            {groups.length} groupe{groups.length !== 1 ? 's' : ''} enregistré{groups.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* ADD BUTTON */}
        <Link
          to="/dashboard/groupes/add"
          className="btn-accent relative flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-lg hover:shadow-blue-500/50 w-fit group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          <span>Ajouter groupe</span>
        </Link>
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="loading-shimmer h-24 rounded-xl" />
          ))}
        </div>
      ) : groups.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Users size={48} className="text-slate-500 mb-4" />
          <p className="text-slate-400 text-lg">Aucun groupe trouvé</p>
          <p className="text-slate-500 text-sm mt-2">Commencez par ajouter un nouveau groupe</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {groups.map((g, idx) => (
            <div
              key={g.id}
              className="card-group fade-in bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-700 hover:border-blue-500/50"
              style={{ animationDelay: `${idx * 0.1}s` }}
              onMouseEnter={() => setHoveredGroup(g.id)}
              onMouseLeave={() => setHoveredGroup(null)}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* LIBELLE */}
                <div className="md:col-span-2">
                  <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">Groupe</p>
                  <h3 className="title-text text-xl font-bold text-white truncate">
                    {g.libelle}
                  </h3>
                </div>

                {/* ENTRAÎNEUR */}
                <div className="md:col-span-2">
                  <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">Entraîneur</p>
                  <p className="text-white font-medium">
                    {g.entraineur?.nom} {g.entraineur?.prenom}
                  </p>
                </div>

                {/* TÉLÉPHONE */}
                <div className="md:col-span-2">
                  <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">Contact</p>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-blue-400" />
                    <span className="text-white font-medium">{g.entraineur?.num_tel || "-"}</span>
                  </div>
                </div>

                {/* DATE */}
                <div className="md:col-span-2">
                  <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">Création</p>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-green-400" />
                    <span className="text-white font-medium text-sm">
                      {new Date(g.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>

                {/* JOUEURS COUNT */}
                <div className="md:col-span-2">
                  <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">Joueurs</p>
                  <div className="flex items-center gap-2">
                    <span className="badge-pulse inline-block w-2.5 h-2.5 bg-blue-400 rounded-full" />
                    <span className="text-white font-bold text-lg">
                      {g.joueurGroupe?.length || 0}
                    </span>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="md:col-span-2 flex justify-end">
                  <div className="flex gap-2">
                    {/* EDIT */}
                    <Link
                      to={`/dashboard/groupes/${g.id}/edit`}
                      className="group p-3 rounded-lg bg-blue-500/20 hover:bg-blue-500/40 text-blue-400 transition-all duration-300"
                      title="Modifier"
                    >
                      <Pen size={18} className="group-hover:rotate-12 transition-transform" />
                    </Link>

                    {/* DELETE */}
                    <button
                      onClick={() => handleDelete(g.id)}
                      className="group p-3 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-400 transition-all duration-300"
                      title="Supprimer"
                    >
                      <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>

              {/* EXPANDED SECTION */}
              {hoveredGroup === g.id && (
                <div className="mt-6 pt-6 border-t border-slate-600 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
                  
                  {/* JOUEURS */}
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-400 mb-3 font-semibold">
                      Gestion joueurs
                    </p>
                    {g.joueurGroupe?.length === 0 ? (
                      <div className="flex gap-2 flex-col">
                        <Link
                          to={`/dashboard/groupes/${g.id}/joueurs/add`}
                          className="btn-accent text-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition"
                        >
                          + Manuel
                        </Link>
                        <Link
                          to={`/dashboard/groupes/${g.id}/joueurs/auto`}
                          className="btn-accent text-center bg-amber-600 hover:bg-amber-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition"
                        >
                          ⚡ Auto
                        </Link>
                      </div>
                    ) : (
                      <div className="flex gap-2 flex-col">
                        <Link
                          to={`/dashboard/groupes/${g.id}/joueurs/edit`}
                          className="btn-accent text-center bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition"
                        >
                          Modifier ({g.joueurGroupe.length})
                        </Link>
                        <Link
                          to={`/dashboard/groupes/${g.id}/list`}
                          className="btn-accent text-center bg-slate-600 hover:bg-slate-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition"
                        >
                          Affichage
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* EMPLOI */}
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-400 mb-3 font-semibold">
                      Emploi du temps
                    </p>
                    <Link
                      to={g?.emploi?.length === 0 ?  `/dashboard/groupes/${g.id}/emploi/add` : `/dashboard/groupes/${g.id}/emploi/edit`}
                      className="btn-accent block text-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition w-full"
                    >
                      {g?.emploi?.length === 0 ? "↳ Créer" : "↳ Modifier"}
                    </Link>
                  </div>

                  {/* INFO */}
                  <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                    <Clock size={16} className="mx-auto mb-2 text-slate-400" />
                    <p className="text-slate-300 text-sm">
                      {g?.emploi?.length || 0} créneaux
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ListGroupes