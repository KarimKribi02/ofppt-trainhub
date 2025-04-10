import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEdit, FaUserPlus, FaEye, FaTrash } from 'react-icons/fa';

function Overview() {
    const [formations, setFormations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterLieu, setFilterLieu] = useState("");
    const [filterStatut, setFilterStatut] = useState("");

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/formations")
            .then((response) => setFormations(response.data || []))
            .catch((error) => {
                console.error("Erreur lors de la récupération des formations :", error);
                setFormations([]);
            });
    }, []);

    const statusStyles = {
        validé: "bg-green-100 text-green-800",
        en_attente: "bg-yellow-100 text-yellow-800",
        rejeté: "bg-red-100 text-red-800",
    };

    const filteredFormations = formations.filter(f => 
        f.titre.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterLieu ? f.lieux === filterLieu : true) &&
        (filterStatut ? f.statut === filterStatut : true)
    );

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:ml-64">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-orange-500">Gestion des Formations</h1>
                <p className="text-gray-600">Vue d'ensemble de toutes les formations</p>
            </div>

            {/* Filtres */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <input 
                            type="text"
                            placeholder="Rechercher par titre..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                    </div>
                    <select
                        className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        value={filterLieu}
                        onChange={(e) => setFilterLieu(e.target.value)}
                    >
                        <option value="">Tous les lieux</option>
                        {[...new Set(formations.map(f => f.lieux))].map(lieu => (
                            <option key={lieu} value={lieu}>{lieu}</option>
                        ))}
                    </select>
                    <select
                        className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        value={filterStatut}
                        onChange={(e) => setFilterStatut(e.target.value)}
                    >
                        <option value="">Tous les statuts</option>
                        <option value="validé">Validé</option>
                        <option value="en_attente">En attente</option>
                        <option value="rejeté">Rejeté</option>
                    </select>
                </div>
            </div>

            {/* Tableau */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-orange-500 text-white">
                            <tr>
                                <th className="p-4 text-left">Titre</th>
                                <th className="p-4 text-left">Début</th>
                                <th className="p-4 text-left">Fin</th>
                                <th className="p-4 text-left">Lieu</th>
                                <th className="p-4 text-left">Statut</th>
                                <th className="p-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredFormations.length > 0 ? (
                                filteredFormations.map((f) => (
                                    <tr key={f.id} className="border-b hover:bg-orange-50 transition-colors">
                                        <td className="p-4">{f.titre}</td>
                                        <td className="p-4">{f.dateDebut}</td>
                                        <td className="p-4">{f.dateFin}</td>
                                        <td className="p-4">{f.lieux}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-sm ${statusStyles[f.statut]}`}>
                                                {f.statut}
                                            </span>
                                        </td>
                                        <td className="p-4 flex gap-2 flex-wrap">
                                            <Link
                                                to={`/CDC/Updatformation/${f.id}`}
                                                className="bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600 transition flex items-center gap-1 text-sm"
                                            >
                                                <FaEdit /> Modifier
                                            </Link>
                                            <Link
                                                to={`/CDC/ajouter-formateurs/${f.id}`}
                                                className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition flex items-center gap-1 text-sm"
                                            >
                                                <FaUserPlus /> Formateur
                                            </Link>
                                            <Link
                                                to={`/CDC/formation/${f.id}`}
                                                className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition flex items-center gap-1 text-sm"
                                            >
                                                <FaEye /> Voir
                                            </Link>
                                            <button
                                                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition flex items-center gap-1 text-sm"
                                            >
                                                <FaTrash /> Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-gray-500">
                                        Aucune formation trouvée
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

export default Overview;