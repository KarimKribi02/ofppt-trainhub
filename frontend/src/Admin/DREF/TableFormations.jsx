import axios from "axios";
import React, { useEffect, useState } from "react";

function TableFormations() {
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


  const handleStatusChange = async (e) => {
    const newStatus = e.target.value; 
  
    try {
      const res = await axios.put(`http://127.0.0.1:8000/api/formations/${formations.map((f) => f.id)}`, { status: newStatus });
  
      if (res.status === 200) {
        console.log("Statut mis à jour :", res.data.message);
      } else {
        console.error("Erreur lors de la mise à jour :", res.data.message);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };
  
  const statusColors = {
    Complétée: "bg-green-100 text-green-600",
    En_cours: "bg-yellow-100 text-yellow-600",
    Annulée: "bg-red-100 text-red-600",
  };

  return (
    <div className="overflow-x-auto p-4 sm:ml-64">
      <table className="min-w-full bg-white border rounded-lg shadow-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left">Titre</th>
            <th className="p-3 text-left">Date de Début</th>
            <th className="p-3 text-left">Date de Fin</th>
            <th className="p-3 text-left">Lieux</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {formations?.length > 0 ? (
            formations.map((f) => (
              <tr key={f.id} className="border-t">
                <td className="p-3">{f.id}</td>
                <td className="p-3">{f.dateDebut}</td>
                <td className="p-3">{f.dateFin}</td>
                <td className="p-3">{f.lieux}</td>
                <td className="p-3">
                  <select
                    value={f.status}
                    onChange={handleStatusChange}
                    className={`p-2 rounded-md text-sm font-semibold border ${statusColors[f.status] || "bg-gray-100 text-gray-600"}`}
                  >
                    <option value="validé">validé</option>
                    <option value="en attente">En attente</option>
                    <option value="rejeté">rejeté</option>
                  </select>
                </td>
                <td className="p-3 flex gap-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">Ajouter</button>
                  <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">Ouvrir</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">Supprimer</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-4 text-gray-500">
                Aucune formation disponible.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TableFormations;
