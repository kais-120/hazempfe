import starAcademyJersey from '../assets/images/logo_stars_academy_mednine.png'
import ballon from '../assets/images/ballon.jpg'
import chaussure from '../assets/images/nike-chaussures-promina.jpg'

const BoutiqueSection = () => {
     const produits = [
    {
      id: 1,
      nom: "Maillot Académie (avec logo)",
      prix: 80,
      promo: 10,
      image: starAcademyJersey,
    },
    {
      id: 2,
      nom: "Ballon Football",
      prix: 50,
      promo: 0,
      image: ballon,
    },
    {
      id: 3,
      nom: "Chaussures Sport",
      prix: 120,
      promo: 20,
      image: chaussure,
    },
  ];

  const acheter = (produit) => {
    console.log("Acheter:", produit);
  };

  return (
    <section id='boutique' className="min-h-screen bg-gray-900 text-white px-6 py-20">
      {/* TITLE */}
      <h2 className="text-4xl font-bold text-center text-yellow-400 mb-12">
        Boutique de l&apos;Académie
      </h2>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-10">
        {produits.map((produit) => (
          <div
            key={produit.id}
            className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition"
          >
            {/* IMAGE */}
            <div className="relative w-full h-56">
              <img
                src={produit.image}
                className="w-full h-full object-cover"
                alt={produit.nom}
              />

              {/* Overlay logo only for product 1 */}
              {produit.id === 1 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10">
                  <img
                    src="assets/image/logo_academy_2026.png"
                    className="w-16 h-16 object-contain opacity-95"
                    alt="logo"
                  />
                  <span className="text-white font-black text-sm text-center">
                    Star Academy <br /> Mednine
                  </span>
                </div>
              )}
            </div>

            {/* CONTENT */}
            <div className="p-5 space-y-3">
              <h3 className="text-xl font-bold">{produit.nom}</h3>

              {/* PRIX */}
              <div className="flex items-center space-x-3">
                <span className="text-yellow-400 text-lg font-bold">
                  {produit.prix} DT
                </span>

                {produit.promo > 0 && (
                  <span className="line-through text-gray-400">
                    {produit.prix + produit.promo} DT
                  </span>
                )}
              </div>

              {/* BUTTON */}
              <button
                onClick={() => acheter(produit)}
                className="w-full bg-yellow-400 text-black py-2 rounded-lg hover:bg-yellow-500 transition"
              >
                Acheter
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default BoutiqueSection