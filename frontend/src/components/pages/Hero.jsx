import React from "react";
import heroImageSrc from "../../assets/images/academeImage.png"

const Hero = () => {
  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center overflow-hidden text-white"
    >
      {/* Background Image */}
      <img
        src={heroImageSrc}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center md:object-[center_40%]"
        width="1920"
        height="1080"
        loading="eager"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex w-full flex-col gap-10 px-6 py-24 md:flex-row md:items-center md:justify-between md:px-10 md:pt-32">
        
        <div className="max-w-xl">

          {/* Title */}
          <h1 className="mb-6 text-4xl font-semibold leading-tight sm:text-5xl md:text-[3.25rem]">
            Stars
            <span className="text-yellow-400">Academy</span>
            <br />
            <span className="text-white/80">Médenine</span>
          </h1>

          {/* Description */}
          <p className="mb-8 text-base sm:text-lg text-white/80">
            Académie de football à Medenine formant les jeunes talents avec rigueur, passion et encadrement professionnel pour 
            un avenir sportif prometteur.
          </p>

          {/* Rating */}
          <div>
            <p className="mb-3 text-sm font-semibold tracking-wide uppercase">
              Avis des utilisateurs
            </p>

            <div className="mb-3 flex items-baseline gap-3">
              <span className="text-yellow-400">★★★★★</span>
              <span className="text-sm text-white/70">
                (4.8/5)
              </span>
            </div>

            <p className="text-lg font-semibold md:text-xl">
              95% de satisfaction
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;