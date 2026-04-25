import { useEffect, useState } from "react";
import { AxiosToken } from "../../Api/Api";

export default function Presence() {
  const [groups, setGroups] = useState([]);
  const [groupId, setGroupId] = useState("");
  const [playerListPresence, setPlayerListPresence] = useState([]);
  const [playerListAbsence, setPlayerListAbsence] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [doPresence, setDoPresence] = useState(false);
  const [groupPresencePresence, setGroupPresencePresence] = useState([]);
  const [groupPresenceAbsence, setGroupPresenceAbsence] = useState([]);

  useEffect(() => {
    AxiosToken.get("/group/get/entraineur/list")
      .then(res => setGroups(res.data.groups));
  }, []);

  useEffect(() => {
    if (!groupId) return;

    const fetchGroup = async () => {
      try {
        const res = await AxiosToken.get(
          `/group/get/entraineur/${groupId}/list`
        );

        setGroupData(res.data.list[0]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGroup();
    setPlayerListAbsence([]);
    setPlayerListPresence([])
  }, [groupId]);

  // toggle absence
  const toggleAbsent = (playerId) => {
    if(!playerListPresence.includes(playerId)){
        setPlayerListAbsence(prev => [...prev,playerId])
    }else{
        setPlayerListPresence(prev =>
        prev.filter(id => id !== playerId)
        );
        setPlayerListAbsence(prev => [...prev,playerId])
    }
  };
  const togglePresence = (playerId) => {
    if(!playerListAbsence.includes(playerId)){
        setPlayerListPresence(prev => [...prev,playerId])
    }else{
        setPlayerListAbsence(prev =>
        prev.filter(id => id !== playerId)
        );
        setPlayerListPresence(prev => [...prev,playerId])
    }
    };

  // save
  const handleSave = async () => {
    
    await AxiosToken.post("/presence", {
      groupe: groupId,
      playerListPresence,
      playerListAbsence,
    });

    alert("Saved successfully");
  };

  useEffect(() => {
    if (!groupId) return;

    const fetchValidation = async () => {
      try {
        const res = await AxiosToken.get(
          `/presence/verify/${groupId}`
        );
        if(res.data.canAdd === false) {
            setDoPresence(true)
        }
        else{
            setDoPresence(false)
        }
      } catch {
        console.error("error")
      }
    };
    fetchValidation();
  }, [groupId]);

  useEffect(() => {
    if (!groupId) return;

    const fetchValidation = async () => {
      try {
        const res = await AxiosToken.get(
          `/presence/${groupId}`
        );
        setGroupPresenceAbsence(res.data.absent_ids)
        setGroupPresencePresence(res.data.present_ids)
    
      } catch {
        console.error("error")
      }
    };
    fetchValidation();
  }, [groupId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Gestion de la présence</h2>

      {/* GROUP SELECT */}
      <select
        value={groupId}
        onChange={(e) => setGroupId(e.target.value)}
        className="border p-2 mb-4"
      >
        <option value="">Select Group</option>
        {groups.map(g => (
          <option key={g.id} value={g.id}>
            {g.libelle}
          </option>
        ))}
      </select>

      {/* TABLE */}
      {groupData?.joueurGroupe && (
        <table className="w-full border">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Nom et prénom</th>
              <th className="p-2 text-center">Présence</th>
              <th className="p-2 text-center">Absent</th>
            </tr>
          </thead>

          <tbody>
            {groupData.joueurGroupe.map(p => (
              <tr key={p.id} className="border-b">
                <td className="p-2">
                  {p.joueurs?.nom} {p.joueurs?.prenom}
                </td>

                <td className="text-center">
                  <input
                    type="checkbox"
                    disabled={doPresence}
                    checked
                    checked={playerListPresence.includes(p.id) || groupPresencePresence.includes(p.id)}
                    onChange={() => togglePresence(p.id)}
                  />
                </td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    disabled={doPresence}
                    checked={playerListAbsence.includes(p.id) || groupPresenceAbsence.includes(p.id)}
                    onChange={() => toggleAbsent(p.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* SAVE */}
      {groupId && (
        <button
        disabled={doPresence}
          onClick={handleSave}
          className="mt-4 bg-blue-500 text-white px-4 py-2"
        >
          Sauvegarder la présence
        </button>
      )}
    </div>
  );
}