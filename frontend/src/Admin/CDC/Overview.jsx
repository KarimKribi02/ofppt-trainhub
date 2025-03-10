import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Overview() {
    const [formations, setFormations] = useState([]);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/formations")
            .then((response) => {
                setFormations(response.data || []);
                console.log("Données récupérées :", response.data);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des formations :", error);
                setFormations([]);
            });
    }, []);

    const statusColors = {
        validé: "bg-green-100 text-green-600",
        en_attente: "bg-yellow-100 text-yellow-600",
        rejeté: "bg-red-100 text-red-600",
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
                        <th className="p-3">Actions</th>
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
                                <td className={`p-3 rounded-md text-sm font-semibold ${statusColors[f.statut] || "bg-gray-100 text-gray-600"}`}>
                                    {f.statut}
                                </td>
                                <td className="p-3 flex space-x-2">
                                <Link 
                                        to={`/CDC/Updatformation/${f.id}`} // ✅ Route avec ID dynamique
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    >
                                       Modifier
                                    </Link>
                                    <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Ajouter Formateur</button>
                                    <Link 
                                        to={`/CDC/formation/${f.id}`} // ✅ Route avec ID dynamique
                                        className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600"
                                    >
                                        Voir
                                    </Link>
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

export default Overview;