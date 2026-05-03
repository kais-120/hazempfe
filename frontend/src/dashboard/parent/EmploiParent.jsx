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

const hours = Array.from({ length: 14 }, (_, i) => 8 + i) // 8 → 21

const EmploiParent = () => {
  const [groups, setGroups] = useState([])
  const [test, setTest] = useState([])


  useEffect(() => {
    const id = localStorage.getItem("child")
    const fetchData = async () => {
      try {
        const res = await AxiosToken.get(`/emploi/parent/${id}`)
        setGroups(res.data.emploi)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const id = window.localStorage.getItem("child");
    if(!id) return
    const fetchData = async () => {
      try {
        const res = await AxiosToken.get(`/testing/parent/${id}`)
        setTest(res.data.test)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])

  // 🔥 Convert HH:mm:ss → decimal (10:30 => 10.5)
  const toDecimal = (time) => {
    const [h, m] = time.split(":").map(Number)
    return h + m / 60
  }

  // 🔥 COMPONENT EVENT
  const EventBlock = ({ event }) => {
    const start = toDecimal(event.heure_debut)
    const end = toDecimal(event.heure_fin)

    const duration = end - start
    

    return (
      <div
        className="absolute top-1 h-12 bg-yellow-400 text-black text-xs p-1 rounded shadow z-10"
        style={{
          left: `${(start - 8) * 100}%`,     // 🔥 position from 8h
          width: `${duration * 100}%`        // 🔥 width correct (with 30min)
        }}
      >
        <div className="font-bold">{event.titre}</div>
        <div className="text-[10px]">
          {event.heure_debut} - {event.heure_fin}
        </div>
      </div>
    )
  }
  const formatTestDate = (dateStr, timeStr) => {
  const date = new Date(`${dateStr}T${timeStr}`);

  const formattedDate = date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${formattedDate} ${formattedTime}`;
};
  if (test) {
    return <p className="p-6">vous avez un test {formatTestDate(test?.date_test,test?.time_test)}</p>
  }

if (!groups.length) {
    return <p className="p-6">vous n'avez pas de groupe</p>
  }

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Mon emploi du temps
      </h1>

      {/* LOOP GROUPES */}
      {groups.map(group => (

        <div key={group.id} className="mb-10">

          {/* ✅ TITLE OUTSIDE TABLE */}
          <h2 className="text-xl font-bold mb-3">
            {group.libelle} — {group.entraineur?.nom} {group.entraineur?.prenom}
          </h2>

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

                {/* DAY NAME */}
                <div className="p-2 font-semibold bg-gray-50 border-r">
                  {day}
                </div>

                {/* GRID CELLS */}
                <div className="col-span-14 relative h-14 border-l">

                  {/* 🔥 RENDER ALL EVENTS IN THIS DAY */}
                  {(group.emploi || [])
                    .filter(e => e.jour === dayIndex)
                    .map(event => (
                      <EventBlock key={event.id} event={event} />
                    ))
                  }

                </div>

              </div>
            ))}

          </div>
        </div>

      ))}

    </div>
  )
}

export default EmploiParent