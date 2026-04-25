import { useState } from "react";
import image1 from "../assets/images/img3.png"
import image2 from "../assets/images/gallery_training_academy.png"
import image3 from "../assets/images/img10.png"
import image4 from "../assets/images/img4.avif"
import image5 from "../assets/images/img12.jpg"
import image6 from "../assets/images/img9.png"
import image7 from "../assets/images/img8.png"

import badgeSrc from "../assets/images/logoAcademy.png"

const photos = [
  {
    src: image1,
    alt: "Jeunes joueurs Stars Academy Mednine",
    caption: "La discipline en classe forge les champions sur le terrain",
  },
  {
    src: image2,
    alt: "Équipe de football",
    caption: "Chaque duel est une leçon",
  },
  {
    src: image3,
    alt: "Célébration équipe",
    caption: "Collectif & célébration",
  },
  {
    src: image4,
    alt: "Entraînement football",
    caption: "Nos champions de demain",
  },
  {
    src: image4,
    alt: "Stade football",
    caption: "La nuit appartient aux champions",
  },
  {
    src: image5,
    alt: "Ballon football",
    caption: "Chaque match est un test de caractère",
  },
  {
    src: image6,
    alt: "Match football",
    caption: "Focus, technique, victoire",
  },
  {
    src: image7,
    alt: "Terrain football",
    caption: "Le terrain, notre école de la vie",
  },
];

const GallerySection = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section id="galerie" className="min-h-screen bg-[#0b1220] text-white px-6 py-16">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold">Galerie</h2>
        <p className="text-slate-400 mt-2">
          Des dribbles, des sourires, des victoires...
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">

        {photos.map((photo, i) => (
          <button
            key={i}
            onClick={() => setSelected(photo)}
            className="group text-left"
          >
            {/* CARD */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10">

              {/* IMAGE */}
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />

              {/* BADGE */}
              <div className="absolute top-3 left-3 bg-black/60 p-2 rounded-md">
                <img src={badgeSrc} alt="badgeSrc" className="w-6 h-6" />
              </div>

              {/* KIT LABEL */}
              <div className="absolute bottom-3 left-3 bg-black/60 px-3 py-1 rounded text-xs">
                STAR ACADEMY MEDNINE
              </div>
            </div>

            {/* CAPTION */}
            <p className="text-slate-300 mt-2 text-sm">
              {photo.caption}
            </p>
          </button>
        ))}
      </div>

      {/* MODAL */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-black max-w-3xl w-full rounded-xl overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 bg-red-500 w-8 h-8 rounded-full"
            >
              ×
            </button>

            <img
              src={selected.src}
              alt={selected.alt}
              className="w-full"
            />

            <div className="p-4 text-sm text-white">
              {selected.caption}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
export default GallerySection;