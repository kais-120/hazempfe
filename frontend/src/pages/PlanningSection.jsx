import image from "../assets/images/img1.jpeg"

const PlanningSection = () => {
  return (
    <section id="planning" className="min-h-screen bg-slate-50 py-20 px-6">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* IMAGE */}
        <div className="relative bg-white rounded-2xl shadow-xl border border-slate-200 p-6 flex items-center justify-center overflow-hidden">

          {/* TOP GOLD LINE */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-black to-yellow-500"></div>

          {/* BLUR BACKGROUND */}
          <img
            src={image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-40"
          />

          {/* MAIN IMAGE */}
          <img
            src={image}
            alt="Planning"
            className="relative max-h-[400px] object-contain z-10"
          />

        </div>

        {/* TEXT */}
        <div className="space-y-6">

          <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 relative">
            Planning
            <span className="block w-10 h-[2px] bg-yellow-500 mt-3"></span>
          </h1>

          <p className="text-slate-500 leading-relaxed max-w-lg">
            Chaque séance est organisée pour améliorer les performances
            des joueurs selon leur catégorie d'âge.
          </p>

          {/* LIST */}
          <ul className="space-y-3">
            {[
              "Entraînements par catégorie",
              "Séances toute la semaine",
              "Programme structuré",
              "Match chaque dimanche",
            ].map((item, i) => (
              <li
                key={i}
                className="relative cursor-pointer bg-white border border-slate-200 rounded-lg px-4 py-3 pl-10 text-slate-700 hover:translate-x-1 hover:border-yellow-400 transition"
              >
                <span className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-yellow-500 rounded-full"></span>
                {item}
              </li>
            ))}
          </ul>

          {/* MOTIVATION */}
          <div className="mt-8 bg-gradient-to-br from-yellow-400 to-yellow-500 text-black p-6 rounded-2xl shadow-xl">

            <h3 className="text-xs uppercase tracking-widest font-bold opacity-70 mb-2">
              Motivation
            </h3>

            <p className="italic text-lg font-medium leading-relaxed">
              "Le travail bat le talent quand le talent ne travaille pas."
            </p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default PlanningSection;