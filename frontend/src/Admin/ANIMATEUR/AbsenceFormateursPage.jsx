import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function AbsenceFormateursPage() {
  const [participants, setParticipants] = useState([]);
  const [absents, setAbsents] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/formation-participants/${id}`
        );

        const data = response.data.participants || [];

        setParticipants(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des participants :", error);
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [id]);

  const toggleAbsence = async (participantId) => {
    const isAbsent = absents.includes(participantId);

    try {
      await axios.put(
        `http://127.0.0.1:8000/api/formations/${id}/participants/${participantId}/absence`,
        { absent: !isAbsent },
        { headers: { "Content-Type": "application/json" } }
      );

      setAbsents((prev) =>
        isAbsent
          ? prev.filter((id) => id !== participantId)
          : [...prev, participantId]
      );
    } catch (error) {
      console.error("Erreur API :", error.response?.data || error.message);
      alert("Échec de mise à jour de l’absence.");
    }
  };

  return (
    <div className="p-4 sm:ml-64 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Absence des formateurs</h1>

      {loading ? (
        <p>Chargement des formateurs...</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Absent</th>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Nom</th>
                <th className="px-4 py-2 text-left">Prénom</th>
                <th className="px-4 py-2 text-left">Filière</th>
                <th className="px-4 py-2 text-left">Établissement</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      className="w-5 h-5"
                      checked={absents.includes(p.id)}
                      onChange={() => toggleAbsence(p.id)}
                    />
                  </td>
                  <td className="px-4 py-2">{p.id}</td>
                  <td className="px-4 py-2">{p.participant.nom}</td>
                  <td className="px-4 py-2">{p.participant.prenom}</td>
                  <td className="px-4 py-2">{p.participant.filliere}</td>
                  <td className="px-4 py-2">{p.participant.etablissement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
