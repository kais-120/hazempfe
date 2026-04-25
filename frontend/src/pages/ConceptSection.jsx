import galleryCoachPlayer from "../assets/images/gallery_coach_player.png"

const ConceptSection = () => {
  return (
    <section id="concept" className="bg-gradient-to-b from-white to-slate-100 py-24 min-h-screen flex items-center overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <div className="space-y-6 animate-[fadeRight_0.8s_ease]">

          <h2 className="text-4xl font-extrabold text-slate-900">
            Star Academy Mednine
          </h2>

          <p className="text-slate-500 text-lg max-w-md leading-relaxed">
            Un espace dédié à l'éveil et à la formation des enfants passionnés
            de football, avec un encadrement professionnel et des services adaptés.
          </p>

          <ul className="space-y-5">
            {[
              "Formation enfants U4 à U16",
              "Encadrement professionnel",
              "Kit d'entraînement fourni",
              "Organisation de tournois",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-lg font-semibold text-slate-900">
                <span className="w-5 h-5 bg-indigo-600 rounded-full shadow-md"></span>
                {item}
              </li>
            ))}
          </ul>

        </div>

        {/* RIGHT */}
        <div className="relative flex items-center justify-center h-[500px] animate-[fadeLeft_0.8s_ease]">

          {/* IMAGE */}
          <div className="relative flex items-center justify-center w-full h-full">

            <img
              src={galleryCoachPlayer}
              alt="Coach et joueur"
              className="max-w-full max-h-[110%] object-contain scale-105 drop-shadow-2xl"
            />

            {/* OVERLAY TEXT */}
            <div className="absolute inset-0 flex items-center justify-center top-[30%] pointer-events-none">

              <span
                className="text-white font-black text-sm lg:text-base uppercase tracking-widest text-center leading-tight -rotate-3"
                style={{
                  WebkitTextStroke: "1px rgba(0,0,0,0.8)",
                  textShadow: "0 2px 4px rgba(0,0,0,1)",
                }}
              >
                Star Academy<br />Mednine
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* ANIMATIONS */}
      <style>
        {`
          @keyframes fadeRight {
            from { opacity: 0; transform: translateX(-30px); }
            to { opacity: 1; transform: translateX(0); }
          }

          @keyframes fadeLeft {
            from { opacity: 0; transform: translateX(30px); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}
      </style>

    </section>
  );
};

export default ConceptSection;