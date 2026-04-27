import { useState } from "react"
import FullCalendar from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { AxiosToken } from "../../Api/Api"
import { useNavigate, useParams } from "react-router-dom"

const AddEmploi = () => {
  const [events, setEvents] = useState([])
  const [error, setError] = useState(false)
  const {id} = useParams();
  const navigate = useNavigate();
  console.log(error)
  const handleSelect = (info) => {
    console.log(info)
    setError(false)
    const title = prompt("Titre de l'événement :")
    console.log(title)

    if (title) {
     setEvents([
      ...events,
      {
        id: Date.now(),
        title,
        start: info.start,
        end: info.end,
      },
    ])
    }
  }
  const handleEventClick = (info) => {
  const confirmDelete = window.confirm("Supprimer cet événement ?")

  if (confirmDelete) {
    setEvents(events.filter(e => e.id != info.event.id))
  }
}
console.log(events)
const handleSubmit = async (e) => {
  e.preventDefault()
  if(events.length === 0){
    setError(true)
  }
  else{
    try{
      await AxiosToken.post(`/emploi/add/${id}`,{
        emploi:events
      })
      navigate("/dashboard/groupes")
    }catch{
      console.error("error")
    }
  }
}

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Emploi du temps
      </h1>

      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        eventClick={handleEventClick}
        initialView="timeGridWeek"

        headerToolbar={{
          left: "",
          center: "title",
          right: "",
        }}

        locale="fr"

        dayHeaderFormat={{
          weekday: "long",
        }}

        slotMinTime="08:00:00"
        slotMaxTime="22:00:00"

        allDaySlot={false}

        selectable={true}
        editable={true}

        select={handleSelect}   // 🔥 THIS IS REQUIRED

        events={events}
      />
     <button
  onClick={handleSubmit}
  className="mt-4 bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-black"
>
  Enregistrer l'emploi
</button>

{error && (
  <p className="text-red-500 text-sm mt-2">
    Veuillez ajouter au moins un emploi
  </p>
)}

    </div>
  )
}

export default AddEmploi