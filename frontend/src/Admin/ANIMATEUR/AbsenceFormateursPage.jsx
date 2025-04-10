import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function AbsenceFormateursPage() {
  const [participants, setParticipants] = useState([]);
  const [absents, setAbsents] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

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

      setAbsents((prev) => {
        const newAbsents = isAbsent
          ? prev.filter((id) => id !== participantId)
          : [...prev, participantId];
        console.log("New absents:", newAbsents);
        return newAbsents;
      });
    } catch (error) {
      console.error("Erreur API :", error.response?.data || error.message);
      alert("Échec de mise à jour de l’absence.");
    }
  };

  const handleBack = () => {
    navigate("/ANIMATEUR/formationsAnimateur");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 sm:ml-64">
      <div className="max-w-5xl mx-auto">
        {/* Header with Title and Back Button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Absence des formateurs</h1>
          <button
            onClick={handleBack}
            className="px-6 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-all duration-200"
          >
            Retour
          </button>
        </div>

        {/* Table Section */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-orange-500 text-white">
                  <tr>
                    <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wide">Absent</th>
                    <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wide">ID</th>
                    <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wide">Nom</th>
                    <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wide">Prénom</th>
                    <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wide">Filière</th>
                    <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wide">Établissement</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.length > 0 ? (
                    participants.map((p) => (
                      <tr key={p.id} className="border-b hover:bg-orange-50 transition-all duration-200">
                        <td className="py-4 px-6">
                          <input
                            type="checkbox"
                            className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                            checked={absents.includes(p.id)}
                            onChange={() => toggleAbsence(p.id)}
                          />
                        </td>
                        <td className="py-4 px-6 text-gray-700">{p.id}</td>
                        <td className="py-4 px-6 text-gray-800 font-medium">{p.participant.nom}</td>
                        <td className="py-4 px-6 text-gray-700">{p.participant.prenom}</td>
                        <td className="py-4 px-6 text-gray-700">{p.participant.filliere}</td>
                        <td className="py-4 px-6 text-gray-700">{p.participant.etablissement}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="py-6 text-center text-gray-500 text-lg">
                        Aucun participant trouvé pour cette formation.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}