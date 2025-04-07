import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCheck, FaTrash, FaEdit, FaUserPlus, FaEye, FaHotel } from 'react-icons/fa';

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

    // 🔍 Filtrer uniquement les formations validées
    const filteredFormations = formations.filter(f => 
        f.statut === "validé" &&
        f.titre.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterLieu ? f.lieux === filterLieu : true)
    );

    // ✅ Accepter une formation (changer son statut)
    const handleAccept = async (id) => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/formations/${id}`, { statut: "validé" });
            setFormations(formations.map(f => f.id === id ? { ...f, statut: "validé" } : f));
        } catch (error) {
            console.error("Erreur lors de l'acceptation de la formation :", error);
        }
    };

    // 🗑️ Supprimer une formation
    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette formation ?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/formations/${id}`);
                setFormations(formations.filter(f => f.id !== id));
            } catch (error) {
                console.error("Erreur lors de la suppression de la formation :", error);
            }
        }
    };

    return (
        <div className="p-6 sm:ml-64 bg-gray-50 min-h-screen">
            {/* 🔍 Barre de recherche et filtres */}
            <div className="mb-6 flex flex-wrap gap-4 items-center bg-white p-4 shadow-md rounded-lg">
                <input 
                    type="text" 
                    placeholder="🔍 Rechercher par titre..." 
                    className="border border-gray-300 p-2 rounded-lg w-full sm:w-1/3 focus:ring-2 focus:ring-blue-400"
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
            </div>

            {/* 📋 Tableau des formations validées */}
            <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
                <table className="min-w-full border border-gray-200 rounded-lg">
                    <thead>
                        <tr className="bg-blue-500 text-white text-left">
                            <th className="p-4">Titre</th>
                            <th className="p-4">Date de Début</th>
                            <th className="p-4">Date de Fin</th>
                            <th className="p-4">Lieux</th>
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
                                    <td className="p-4 flex flex-wrap gap-2">
                                        <button 
                                            onClick={() => handleAccept(f.id)}
                                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center gap-1"
                                        >
                                            <FaCheck /> 
                                        </button>
                                        <Link 
                                            to={`/DREF/Updatformation/${f.id}`} 
                                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-1"
                                        >
                                            <FaEdit /> 
                                        </Link>
                                        <Link 
                                            to={`/DREF/ajouter-formateurs/${f.id}`} 
                                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center gap-1"
                                        >
                                            <FaUserPlus />
                                        </Link>
                                        <Link 
                                            to={`/DREF/formation/${f.id}`} 
                                            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition flex items-center gap-1"
                                        >
                                            <FaEye /> 
                                        </Link>
                                        <Link 
                                            to={`/DREF/ajouter-hebergement/${f.id}`} 
                                            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition flex items-center gap-1"
                                        >
                                            <FaHotel /> 
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(f.id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition flex items-center gap-1"
                                        >
                                            <FaTrash /> 
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center p-6 text-gray-500">
                                    Aucune formation validée disponible.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DrefFormations;
