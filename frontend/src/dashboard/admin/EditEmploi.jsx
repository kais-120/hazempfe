import { useEffect, useState } from "react"
import FullCalendar from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { AxiosToken } from "../../Api/Api"
import { useNavigate, useParams } from "react-router-dom"

const EditEmploi = () => {
  const [events, setEvents] = useState([])
  const [newEvents, setNewEvents] = useState([])
  const [error, setError] = useState(false)
  const [deleteEvents, setDeleteEvents] = useState([])
  const {id} = useParams();
  const navigate = useNavigate();

  const getDateFromWeekDay = (dayIndex) => {
  const now = new Date();

  const currentDay = now.getDay();

  const mondayOffset = (currentDay === 0 ? -6 : 1 - currentDay);

  const monday = new Date(now);
  monday.setDate(now.getDate() + mondayOffset);

  const target = new Date(monday);
  target.setDate(monday.getDate() + dayIndex);

  return target.toISOString().split("T")[0];
};
  useEffect(()=>{
    const emploiData = async () => {
      try{
        const res = await AxiosToken.get(`emploi/get/${id}`);
        const formattedEvents = res.data.emplois.emploi.map(item => ({
        id:item.id,
        title: item.titre,
        start: `${getDateFromWeekDay(item.jour)}T${item.heure_debut}`,
        end: `${getDateFromWeekDay(item.jour)}T${item.heure_fin}`,
        fromApi: true,
      }));

      setEvents(formattedEvents);
      }catch{
        navigate(-1)
      }
    }
    emploiData();
  },[id])
  const handleSelect = (info) => {
    setError(false)
    const title = prompt("Titre de l'événement :")

    if (title) {
     setNewEvents([
      ...newEvents,
      {
        id: Date.now(),
        title,
        start: info.start,
        end: info.end,
        fromApi: false,
      },
    ])
    }
  }
  const handleEventClick = (info) => {
  const confirmDelete = window.confirm("Supprimer cet événement ?")
  if (confirmDelete) {
    setEvents(events.filter(e => e.id != info.event.id))
    if(events[0].fromApi === true){
      console.log("first")
      setDeleteEvents(prev => [...prev,info.event.id])
    }
  }
}
console.log(deleteEvents)
const handleSubmit = async (e) => {
  e.preventDefault()
  if(events.length === 0){
    setError(true)
  }
  else{
    try{
      await AxiosToken.put(`/emploi/${id}`,{
        emploi:newEvents,
        deleteEvents:deleteEvents
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

        select={handleSelect} 

        events={[...events, ...newEvents]}
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

export default EditEmploi