import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEye, FaUserSlash } from 'react-icons/fa';

function DrefFormations() {
    const [formations, setFormations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterLieu, setFilterLieu] = useState("");

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/formations")
            .then((response) => {
                setFormations(response.data || []);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des formations :", error);
                setFormations([]);
            });
    }, []);

    const filteredFormations = formations.filter(f => 
        f.statut === "validé" &&
        f.titre.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterLieu ? f.lieux === filterLieu : true)
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 sm:ml-64">
            {/* Filter Section */}
            <div className="max-w-6xl mx-auto mb-8">
                <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <input 
                            type="text" 
                            placeholder="Rechercher par titre..." 
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                    </div>
                    <select 
                        className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                        value={filterLieu} 
                        onChange={(e) => setFilterLieu(e.target.value)}
                    >
                        <option value="">Tous les lieux</option>
                        {[...new Set(formations.map(f => f.lieux))].map(lieu => (
                            <option key={lieu} value={lieu}>{lieu}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table Section */}
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-orange-500 text-white">
                            <tr>
                                <th className="p-4 text-left font-semibold text-sm uppercase tracking-wide">Titre</th>
                                <th className="p-4 text-left font-semibold text-sm uppercase tracking-wide">Date de Début</th>
                                <th className="p-4 text-left font-semibold text-sm uppercase tracking-wide">Date de Fin</th>
                                <th className="p-4 text-left font-semibold text-sm uppercase tracking-wide">Lieux</th>
                                <th className="p-4 text-left font-semibold text-sm uppercase tracking-wide">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredFormations.length > 0 ? (
                                filteredFormations.map((f) => (
                                    <tr key={f.id} className="border-b hover:bg-orange-50 transition-all duration-200">
                                        <td className="p-4 text-gray-800 font-medium">{f.titre}</td>
                                        <td className="p-4 text-gray-600">{f.dateDebut}</td>
                                        <td className="p-4 text-gray-600">{f.dateFin}</td>
                                        <td className="p-4 text-gray-600">{f.lieux}</td>
                                        <td className="p-4 flex flex-wrap gap-2">
                                            <Link 
                                                to={`/ANIMATEUR/formation/${f.id}`} 
                                                className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transform hover:scale-105 transition-all duration-200"
                                                title="Voir la formation"
                                            >
                                                <FaEye />
                                            </Link>
                                            <Link 
                                                to={`/ANIMATEUR/formation/${f.id}/absence`} 
                                                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transform hover:scale-105 transition-all duration-200"
                                                title="Signaler une absence de formateur"
                                            >
                                                <FaUserSlash />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-6 text-center text-gray-500 text-lg">
                                        Aucune formation validée disponible.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default DrefFormations;