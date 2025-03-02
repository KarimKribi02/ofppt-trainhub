import axios from "axios";
import React, { useEffect, useState } from "react";

function TableFormations() {
  const [formations, setFormations] = useState([]);
  
  useEffect(() => {
    fetchFormations();
  }, []);

  const fetchFormations = async () => {
    try {
     
      const response = await axios.get(`http://localhost:8000/api/formations`);
      setFormations(response.data);
    } catch (err) {
      console.error('Error recuperer formations:', err);
    } 
  };


  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/formations/${id}`, {
        statut: newStatus
      });
      
      if (response.data.status === 200) {
        console.log('status : ',response.data.message)
        setFormations(formations.map(f => 
          f.id === id ? { ...f, statut: newStatus } : f
        ));
      }
    } catch (err) {
      console.error('Error de mise a jour status:', err)

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
                <td className="p-3">{f.titre}</td>
                <td className="p-3">{f.dateDebut}</td>
                <td className="p-3">{f.dateFin}</td>
                <td className="p-3">{f.lieux}</td>
                <td className="p-3">
                  <select
                    value={f.statut}
                    onChange={(e) => handleStatusChange(f.id, e.target.value)}
                    className={`p-2 rounded-md text-sm font-semibold border ${statusColors[f.statut] || "bg-gray-100 text-gray-600"}`}
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
