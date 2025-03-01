import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Overview() {
    const [formations, setFormations] = useState([]); // ✅ Initialisation avec un tableau vide

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/formations")
      .then((response) => {
        setFormations(response.data || []); // ✅ Assure que formations est toujours un tableau
        console.log("Données récupérées :", response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des formations :", error);
        setFormations([]); // ✅ En cas d'erreur, éviter `undefined`
      });
  }, []);

  const statusColors = {
    Complétée: "bg-green-100 text-green-600",
    En_cours: "bg-yellow-100 text-yellow-600",
    Annulée: "bg-red-100 text-red-600",
  };

  return (
    <div className="overflow-x-auto p-4 sm:ml-64">
      <table className="min-w-full bg-white border rounded-lg shadow-sm">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">Titre</th>
            <th className="p-3">Date de Début</th>
            <th className="p-3">Date de Fin</th>
            <th className="p-3">Lieux</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {formations.length > 0 ? (
            formations.map((f, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{f.titre}</td>
                <td className="p-3">{f.dateDebut}</td>
                <td className="p-3">{f.dateFin}</td>
                <td className="p-3">{f.lieux}</td>
                <td className={`p-3 rounded-md text-sm font-semibold ${statusColors[f.status] || "bg-gray-100 text-gray-600"}`}>
                  {f.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">
                Aucune formation disponible.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}



export default Overview