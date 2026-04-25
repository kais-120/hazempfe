
const Footer = () => {
    const footerTagline =
    'Former – Inspirer – Révéler les talents de demain';

  const year = new Date().getFullYear();
  return (
   <footer className="relative text-white overflow-hidden bg-gradient-to-b from-[#0f2744] via-[#0a1628] to-[#03060c]">

      {/* BACKDROP */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_12%_35%,rgba(212,175,55,0.14),transparent_50%),radial-gradient(ellipse_at_88%_65%,rgba(56,130,200,0.18),transparent_50%),radial-gradient(ellipse_at_50%_0%,rgba(30,80,140,0.35),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.035] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
      </div>

      {/* WAVE */}
      <svg
        className="absolute top-0 w-full h-20 -translate-y-full drop-shadow-lg"
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="wave" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a4a7a" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0d1f35" stopOpacity="0.95" />
          </linearGradient>
        </defs>
        <path
          fill="url(#wave)"
          d="M0,56 C240,8 480,104 720,48 C960,-8 1200,88 1440,40 L1440,96 L0,96 Z"
        />
      </svg>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">

        {/* BRAND */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-[#e8c547]">
            Stars Academy Médenine
          </h2>
          <p className="mt-3 text-sm text-white/60 max-w-xs">
            {footerTagline}
          </p>
        </div>

        {/* LINKS */}
        {[
          {
            title: "À propos",
            links: ["Accueil", "Concept", "Activités", "Planning", "Galerie"]
          },
          {
            title: "Programmes",
            links: ["Formation enfants", "Encadrement", "Boutique", "Événements"]
          },
          {
            title: "Services",
            links: ["Contact", "Planning", "Boutique"]
          }
        ].map((section, i) => (
          <div key={i}>
            <h3 className="text-xs uppercase tracking-widest text-[#e8c547] mb-4">
              {section.title}
            </h3>

            <ul className="space-y-2 text-sm text-white/60">
              {section.links.map((link, j) => (
                <li key={j}>
                  <a href="#" className="hover:text-[#e8c547] transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* BOTTOM BAR */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-white/40">
          © {year} Stars Academy Médenine. Tous droits réservés.
        </p>

        <a
          href="#"
          className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#d4af37] hover:text-[#e8c547]"
        >
          Haut de page
          <span className="w-7 h-7 flex items-center justify-center rounded border border-[#d4af37]/40 bg-[#d4af37]/10">
            ↑
          </span>
        </a>
      </div>
    </footer>
  )
}

export default Footer