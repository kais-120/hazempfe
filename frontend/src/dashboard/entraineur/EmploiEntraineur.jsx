import { useEffect, useState } from "react"
import { AxiosToken } from "../../Api/Api"

const days = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi"
]
const hours = Array.from({ length: 14 }, (_, i) => 8 + i)

const EmploiEntraineur = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AxiosToken.get("/emploi/entraineur")
        setEvents(res.data.emploi)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])

  const toDecimal = (time) => {
    const [h, m] = time.split(":").map(Number)
    return h + m / 60
  }

  const EventBlock = ({ event }) => {
    const start = toDecimal(event.heure_debut)
    const end = toDecimal(event.heure_fin)
    const duration = end - start

    return (
      <div
        className="absolute top-1 h-12 bg-yellow-400 text-black text-xs p-1 rounded shadow"
        style={{
          left: `${(start - 8) * 100}%`,
          width: `${duration * 100}%`
        }}
      >
        <div className="font-bold">{event.titre}</div>

        {/* ✅ group name */}
        <div className="text-[10px] font-semibold text-blue-900">
          {event.groupe?.libelle}
        </div>

        <div className="text-[10px]">
          {event.heure_debut} - {event.heure_fin}
        </div>
      </div>
    )
  }

  if (!events.length) {
    return <p className="p-6">Chargement...</p>
  }



  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Mon emploi du temps
      </h1>

      <div className="overflow-x-auto border">

        {/* HEADER */}
        <div className="grid grid-cols-[120px_repeat(14,1fr)] bg-gray-100">
          <div className="p-2 font-bold">Jour</div>

          {hours.map(h => (
            <div key={h} className="p-2 text-xs text-center border-l">
              {h}:00
            </div>
          ))}
        </div>

        {/* DAYS */}
        {days.map((day, dayIndex) => (
          <div
            key={dayIndex}
            className="grid grid-cols-[120px_repeat(14,1fr)] border-t"
          >

            <div className="p-2 font-semibold bg-gray-50 border-r">
              {day}
            </div>

            <div className="col-span-14 relative h-14 border-l">

              {events
                .filter(e => e.jour === dayIndex)
                .map(event => (
                  <EventBlock
                    key={event.id}
                    event={event}
                  />
                ))
              }

            </div>

          </div>
        ))}

      </div>
    </div>
  )
}
export default EmploiEntraineur;