import { Zap, Heart, BarChart3 } from "lucide-react";

const activities = [
  {
    title: "Football Technique",
    desc: "Séances intenses pour maîtriser le contrôle de balle, la précision des passes et la puissance des tirs.",
    duration: "1h30",
    icon: Zap,
  },
  {
    title: "Condition Physique",
    desc: "Exercices de renforcement musculaire, endurance et agilité pour surpasser l'adversaire.",
    duration: "1h00",
    icon: Heart,
  },
  {
    title: "Tactique et Stratégie",
    desc: "Analyse pointue des matchs, placement intelligent sur le terrain et cohésion d'équipe optimale.",
    duration: "1h00",
    icon: BarChart3,
  },
];

const ActivitySection = () => {
  return (
    <section id="activites" className="bg-slate-900 min-h-screen py-20 px-6">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16 animate-[fadeDown_0.6s_ease]">

          <h1 className="text-white text-4xl md:text-5xl font-extrabold uppercase tracking-wide mb-4">
            Nos Activités Sportives
          </h1>

          <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Découvrez toutes les activités et séances d’entraînement que notre académie propose pour développer les compétences de chaque joueur aux plus hauts standards.
          </p>

          <div className="w-20 h-1 bg-yellow-500 mx-auto mt-6 rounded"></div>

        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

          {activities.map((act, i) => {
            const Icon = act.icon;

            return (
              <div
                key={i}
                className="bg-slate-800 rounded-2xl p-8 flex flex-col justify-between shadow-xl border border-white/5 hover:-translate-y-2 hover:shadow-2xl transition duration-300 relative overflow-hidden animate-[fadeUp_0.6s_ease]"
                style={{ animationDelay: `${i * 0.1}s` }}
              >

                {/* glow top */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-0 hover:opacity-100 transition"></div>

                {/* CONTENT */}
                <div>

                  <div className="w-16 h-16 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="text-yellow-400 w-8 h-8" />
                  </div>

                  <h2 className="text-white text-xl font-bold mb-3">
                    {act.title}
                  </h2>

                  <p className="text-slate-400 leading-relaxed">
                    {act.desc}
                  </p>

                </div>

                {/* FOOTER */}
                <div className="mt-6">
                  <span className="text-yellow-400 text-sm font-bold uppercase border border-yellow-400/20 bg-white/5 px-4 py-2 rounded-lg">
                    Durée : {act.duration}
                  </span>
                </div>

              </div>
            );
          })}

        </div>

      </div>

      {/* ANIMATIONS */}
      <style>
        {`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes fadeDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

    </section>
  );
};

export default ActivitySection;