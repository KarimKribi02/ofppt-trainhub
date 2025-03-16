import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEdit, FaUserPlus, FaEye, FaTrash, FaCheck } from 'react-icons/fa';

function Overview() {
    const [formations, setFormations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterLieu, setFilterLieu] = useState("");
    const [filterStatut, setFilterStatut] = useState("");

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

    const statusColors = {
        validé: "bg-green-200 text-green-700",
        en_attente: "bg-yellow-200 text-yellow-700",
        rejeté: "bg-red-200 text-red-700",
    };

    const filteredFormations = formations.filter(f => 
        f.titre.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterLieu ? f.lieux === filterLieu : true) &&
        (filterStatut ? f.statut === filterStatut : true)
    );

    return (
        <div className="p-6 sm:ml-64 bg-gray-50 min-h-screen">
            {/* 🔍 Filtres de recherche */}
            <div className="mb-6 flex flex-wrap gap-4 items-center bg-white p-4 shadow-md rounded-lg">
                <input 
                    type="text" 
                    placeholder="🔍 Rechercher par titre..." 
                    className="border border-gray-300 p-2 rounded-lg w-full sm:w-1/4 focus:ring-2 focus:ring-blue-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select 
                    className="border border-gray-300 p-2 rounded-lg w-full sm:w-1/3 focus:ring-2 focus:ring-blue-400" 
                    value={filterLieu} 
                    onChange={(e) => setFilterLieu(e.target.value)}
                >
                    <option value="">Tous les lieux</option>
                    {[...new Set(formations.map(f => f.lieux))].map(lieu => (
                        <option key={lieu} value={lieu}>{lieu}</option>
                    ))}
                </select>
                <select 
                    className="border border-gray-300 p-2 rounded-lg w-full sm:w-1/3 focus:ring-2 focus:ring-blue-400" 
                    value={filterStatut} 
                    onChange={(e) => setFilterStatut(e.target.value)}
                >
                    <option value="">Tous les statuts</option>
                    <option value="validé">Validé</option>
                    <option value="redigé">Rédigé</option>
                </select>
            </div>

            {/* 📋 Tableau des formations */}
            <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
                <table className="min-w-full border border-gray-200 rounded-lg">
                    <thead>
                        <tr className="bg-blue-500 text-white text-left">
                            <th className="p-4">Titre</th>
                            <th className="p-4">Date de Début</th>
                            <th className="p-4">Date de Fin</th>
                            <th className="p-4">Lieux</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFormations.length > 0 ? (
                            filteredFormations.map((f, index) => (
                                <tr key={index} className="border-t hover:bg-gray-100 transition duration-200">
                                    <td className="p-4">{f.titre}</td>
                                    <td className="p-4">{f.dateDebut}</td>
                                    <td className="p-4">{f.dateFin}</td>
                                    <td className="p-4">{f.lieux}</td>
                                    <td className={`p-4 rounded-lg text-sm font-semibold ${statusColors[f.statut] || "bg-gray-100 text-gray-600"}`}>
                                        {f.statut}
                                    </td>
                                    <td className="p-4 flex flex-wrap gap-2">
                                        <Link 
                                            to={`/CDC/Updatformation/${f.id}`} 
                                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-1"
                                        >
                                            <FaEdit /> Modifier
                                        </Link>
                                        <Link 
                                            to={`/CDC/ajouter-formateurs/${f.id}`} 
                                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center gap-1"
                                        >
                                            <FaUserPlus /> Formateur
                                        </Link>
                                        <Link 
                                            to={`/CDC/formation/${f.id}`} 
                                            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition flex items-center gap-1"
                                        >
                                            <FaEye /> Voir
                                        </Link>
                                        <button 
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition flex items-center gap-1"
                                        >
                                            <FaTrash /> Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center p-6 text-gray-500">
                                    Aucune formation disponible.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Overview;
