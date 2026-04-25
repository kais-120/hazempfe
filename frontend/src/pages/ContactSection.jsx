import { Mail, MapPin, Phone } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" class="min-h-screen bg-black text-white flex items-center justify-center px-6 py-24">

  <div class="max-w-7xl w-full grid gap-12 lg:grid-cols-[1fr_380px]">

    <div class="relative rounded-3xl overflow-hidden border border-white/10 p-10">

      <div class="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-800 to-indigo-950"></div>

      <div class="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent)]"></div>

      <div class="relative z-10 text-center">

        <h2 class="text-2xl md:text-3xl font-bold tracking-[0.2em]">
          CONTACTEZ-NOUS
        </h2>

        <div class="mt-14 grid sm:grid-cols-3 gap-8">

          <div class="text-center">
            <div class="mx-auto text-black mb-4 w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg">
              <Mail size={18} />
            </div>
            <p class="uppercase text-sm text-white/80 font-semibold">Email</p>
            <a class="text-sm text-white/70 hover:text-yellow-300 break-all"
               href="mailto:contact@starsacademy-medenine.tn">
              contact@starsacademy-medenine.tn
            </a>
          </div>

          <div class="text-center">
            <div class="mx-auto text-black mb-4 w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg">
              <Phone size={18} />
            </div>
            <p class="uppercase text-sm text-white/80 font-semibold">Téléphone</p>
            <a class="text-sm text-white/70 hover:text-yellow-300"
               href="tel:+21653848500">
              +216 53 848 500
            </a>
          </div>

          <div class="text-center">
            <div class="mx-auto text-black mb-4 w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg">
              <MapPin size={18} />
            </div>
            <p class="uppercase text-sm text-white/80 font-semibold">Adresse</p>
            <p class="text-sm text-white/70">
              Médenine, Tunisie
            </p>
          </div>

        </div>
      </div>
    </div>

    <div class="bg-white rounded-2xl p-8 text-black shadow-xl">

      <h3 class="text-lg font-bold uppercase tracking-widest mb-2">
        Écrivez-nous
      </h3>

      <p class="text-sm text-gray-500 mb-6">
        Une question ou inscription ? envoyez un message
      </p>

      <div class="space-y-4">

        <input
          type="text"
          placeholder="Nom"
          class="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 focus:ring-2 focus:ring-yellow-400 outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          class="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 focus:ring-2 focus:ring-yellow-400 outline-none"
        />

        <textarea
          rows="4"
          placeholder="Message"
          class="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 focus:ring-2 focus:ring-yellow-400 outline-none"
        ></textarea>

        <button
          class="w-full bg-yellow-400 hover:bg-yellow-500 transition py-3 rounded-full font-semibold"
        >
          Envoyer
        </button>

      </div>
    </div>

  </div>
</section>
  );
};

export default ContactSection;