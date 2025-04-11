import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEdit, FaUserPlus, FaEye, FaTrash, FaFilter, FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaTag } from 'react-icons/fa';

function VueFormations() {
    const [formations, setFormations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterLieu, setFilterLieu] = useState("");
    const [filterStatut, setFilterStatut] = useState("");
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://127.0.0.1:8000/api/formations")
            .then((response) => {
                setFormations(response.data || []);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des formations :", error);
                setFormations([]);
                setLoading(false);
                afficherNotification("Impossible de charger les formations", "erreur");
            });
    }, []);

    const afficherNotification = (message, type = "succès") => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 5000);
    };

    const handleSupprimer = (id, titre) => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer la formation "${titre}" ?`)) {
            // Simulation de suppression (à remplacer par l'appel API réel)
            afficherNotification(`La formation "${titre}" a été supprimée avec succès`, "succès");
        }
    };

    const statusStyles = {
        validé: "bg-green-100 text-green-800 border-green-300",
        en_attente: "bg-yellow-100 text-yellow-800 border-yellow-300",
        rejeté: "bg-red-100 text-red-800 border-red-300",
    };

    const statusIcons = {
        validé: "✓",
        en_attente: "⏱",
        rejeté: "✕",
    };

    const filteredFormations = formations.filter(f => 
        f.titre.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterLieu ? f.lieux === filterLieu : true) &&
        (filterStatut ? f.statut === filterStatut : true)
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-4 sm:ml-64">
            {/* Notification */}
            {notification && (
                <div className={`fixed top-6 right-6 max-w-md px-6 py-3 rounded-lg shadow-lg border-l-4 z-50 flex items-center space-x-3 transform transition-all duration-500 animate-fade-in ${
                    notification.type === "succès" 
                        ? "bg-green-50 border-green-500 text-green-800" 
                        : "bg-red-50 border-red-500 text-red-800"
                }`}>
                    <span className="text-2xl">
                        {notification.type === "succès" ? "✓" : "✕"}
                    </span>
                    <p>{notification.message}</p>
                    <button 
                        onClick={() => setNotification(null)}
                        className="ml-auto text-gray-400 hover:text-gray-600"
                    >
                        ×
                    </button>
                </div>
            )}

            <div className="max-w-7xl mx-auto">
                {/* En-tête */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-l-4 border-orange-500 flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-3xl md:text-4xl font-bold text-orange-600 flex items-center gap-3">
                            <span className="bg-orange-100 text-orange-600 p-2 rounded-full">
                                <FaCalendarAlt className="h-6 w-6" />
                            </span>
                            Catalogue des Formations
                        </h1>
                        <p className="text-gray-600 mt-2">Gérez et suivez toutes vos formations en un seul endroit</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link
                            to="/CDC/ajouter-formation"
                            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center gap-2"
                        >
                            <span>+</span> Nouvelle formation
                        </Link>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`${showFilters ? 'bg-orange-600' : 'bg-gray-200 text-gray-700'} px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2`}
                        >
                            <FaFilter /> Filtres
                        </button>
                    </div>
                </div>

                {/* Filtres */}
                <div className={`bg-white rounded-2xl shadow-lg mb-8 overflow-hidden transition-all duration-500 ease-in-out ${
                    showFilters ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaFilter className="text-orange-500" /> Filtrer les formations
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaSearch className="text-orange-500" />
                                </div>
                                <input 
                                    type="text"
                                    placeholder="Rechercher par titre..."
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                            </div>
                            
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaMapMarkerAlt className="text-orange-500" />
                                </div>
                                <select
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none transition-all"
                                    value={filterLieu}
                                    onChange={(e) => setFilterLieu(e.target.value)}
                                >
                                    <option value="">Tous les lieux</option>
                                    {[...new Set(formations.map(f => f.lieux))].map(lieu => (
                                        <option key={lieu} value={lieu}>{lieu}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                                <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                            </div>
                            
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaTag className="text-orange-500" />
                                </div>
                                <select
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none transition-all"
                                    value={filterStatut}
                                    onChange={(e) => setFilterStatut(e.target.value)}
                                >
                                    <option value="">Tous les statuts</option>
                                    <option value="validé">Validé</option>
                                    <option value="en_attente">En attente</option>
                                    <option value="rejeté">Rejeté</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                                <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* État du chargement */}
                {loading ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 border-t-4 border-b-4 border-orange-500 rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-600 font-medium">Chargement des formations...</p>
                    </div>
                ) : (
                    <>
                        {/* Vue carte pour mobile */}
                        <div className="lg:hidden space-y-4 mb-8">
                            {filteredFormations.length > 0 ? (
                                filteredFormations.map(formation => (
                                    <div key={formation.id} className="bg-white rounded-2xl shadow-md overflow-hidden border-l-4 border-orange-500 hover:shadow-xl transition-all duration-300">
                                        <div className="p-5">
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-xl font-bold text-gray-800">{formation.titre}</h3>
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusStyles[formation.statut]}`}>
                                                    {statusIcons[formation.statut]} {formation.statut}
                                                </span>
                                            </div>
                                            
                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center text-gray-600">
                                                    <FaCalendarAlt className="mr-2 text-orange-500" />
                                                    <span className="mr-4">Début: {formation.dateDebut}</span>
                                                    <span>Fin: {formation.dateFin}</span>
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                    <FaMapMarkerAlt className="mr-2 text-orange-500" />
                                                    {formation.lieux}
                                                </div>
                                            </div>
                                            
                                            <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
                                                <Link
                                                    to={`/CDC/Updatformation/${formation.id}`}
                                                    className="bg-orange-500 text-white px-3 py-2 rounded-lg hover:bg-orange-600 transition flex items-center gap-1 text-sm flex-1"
                                                >
                                                    <FaEdit /> Modifier
                                                </Link>
                                                <Link
                                                    to={`/CDC/ajouter-formateurs/${formation.id}`}
                                                    className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition flex items-center gap-1 text-sm flex-1"
                                                >
                                                    <FaUserPlus /> Formateurs
                                                </Link>
                                                <Link
                                                    to={`/CDC/formation/${formation.id}`}
                                                    className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-1 text-sm flex-1"
                                                >
                                                    <FaEye /> Voir
                                                </Link>
                                                <button
                                                    onClick={() => handleSupprimer(formation.id, formation.titre)}
                                                    className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition flex items-center gap-1 text-sm flex-1"
                                                >
                                                    <FaTrash /> Supprimer
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                                    <div className="text-gray-400 mb-4">
                                        <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-700 mb-1">Aucune formation trouvée</h3>
                                    <p className="text-gray-500">Essayez de modifier vos filtres ou d'ajouter une nouvelle formation</p>
                                </div>
                            )}
                        </div>

                        {/* Vue tableau pour desktop */}
                        <div className="hidden lg:block bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Liste des formations
                                    <span className="ml-2 text-sm font-normal text-orange-500 bg-orange-100 px-2 py-1 rounded-full">
                                        {filteredFormations.length} résultats
                                    </span>
                                </h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-orange-500 text-white">
                                        <tr>
                                            <th className="p-4 text-left font-semibold">Titre</th>
                                            <th className="p-4 text-left font-semibold">Début</th>
                                            <th className="p-4 text-left font-semibold">Fin</th>
                                            <th className="p-4 text-left font-semibold">Lieu</th>
                                            <th className="p-4 text-left font-semibold">Statut</th>
                                            <th className="p-4 text-left font-semibold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredFormations.length > 0 ? (
                                            filteredFormations.map((formation, index) => (
                                                <tr 
                                                    key={formation.id} 
                                                    className="border-b hover:bg-orange-50 transition-all duration-300"
                                                    style={{
                                                        animation: `fadeIn 0.5s ease-out forwards ${index * 0.05}s`,
                                                        opacity: 0
                                                    }}
                                                >
                                                    <td className="px-4 py-3 font-medium text-gray-800">{formation.titre}</td>
                                                    <td className="px-4 py-3 text-gray-700">{formation.dateDebut}</td>
                                                    <td className="px-4 py-3 text-gray-700">{formation.dateFin}</td>
                                                    <td className="px-4 py-3 text-gray-700">{formation.lieux}</td>
                                                    <td className="px-4 py-3">
                                                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusStyles[formation.statut]}`}>
                                                            {statusIcons[formation.statut]} {formation.statut}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex gap-2 flex-wrap">
                                                            <Link
                                                                to={`/CDC/Updatformation/${formation.id}`}
                                                                className="bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600 transition flex items-center gap-1 text-sm"
                                                                aria-label="Modifier la formation"
                                                                title="Modifier la formation"
                                                            >
                                                                <FaEdit /> Modifier
                                                            </Link>
                                                            <Link
                                                                to={`/CDC/ajouter-formateurs/${formation.id}`}
                                                                className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition flex items-center gap-1 text-sm"
                                                                aria-label="Gérer les formateurs"
                                                                title="Gérer les formateurs"
                                                            >
                                                                <FaUserPlus /> Formateurs
                                                            </Link>
                                                            <Link
                                                                to={`/CDC/formation/${formation.id}`}
                                                                className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition flex items-center gap-1 text-sm"
                                                                aria-label="Voir les détails"
                                                                title="Voir les détails"
                                                            >
                                                                <FaEye /> Voir
                                                            </Link>
                                                            <button
                                                                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition flex items-center gap-1 text-sm"
                                                                onClick={() => handleSupprimer(formation.id, formation.titre)}
                                                                aria-label="Supprimer la formation"
                                                                title="Supprimer la formation"
                                                            >
                                                                <FaTrash /> Supprimer
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="p-8 text-center text-gray-500">
                                                    <div className="flex flex-col items-center">
                                                        <svg className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <p className="text-lg font-medium mb-1">Aucune formation trouvée</p>
                                                        <p className="text-gray-400">Essayez de modifier vos filtres ou d'ajouter une nouvelle formation</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes slideFadeIn {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                .animate-fade-in {
                    animation: slideFadeIn 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
}

export default VueFormations;