import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCheck, FaTrash, FaEdit, FaUserPlus, FaEye, FaHotel, FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaSortAmountDown } from 'react-icons/fa';
import { motion } from 'framer-motion';

function DrefFormations() {
    const [formations, setFormations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterLieu, setFilterLieu] = useState("");
    const [loading, setLoading] = useState(true);
    const [sorting, setSorting] = useState({ field: 'dateDebut', direction: 'asc' });
    const [currentView, setCurrentView] = useState('grid'); // 'grid' ou 'table'

    useEffect(() => {
        const fetchFormations = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/formations");
                setFormations(response.data || []);
            } catch (error) {
                console.error("Erreur lors de la récupération des formations :", error);
                setFormations([]);
            } finally {
                setLoading(false);
            }
        };
        
        fetchFormations();
    }, []);

    const handleSort = (field) => {
        setSorting(prev => ({
            field,
            direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const sortedFormations = [...formations].filter(f => 
        f.statut === "validé" &&
        f.titre.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterLieu ? f.lieux === filterLieu : true)
    ).sort((a, b) => {
        if (sorting.field === 'titre') {
            return sorting.direction === 'asc' 
                ? a.titre.localeCompare(b.titre)
                : b.titre.localeCompare(a.titre);
        }
        if (sorting.field === 'dateDebut') {
            return sorting.direction === 'asc' 
                ? new Date(a.dateDebut) - new Date(b.dateDebut)
                : new Date(b.dateDebut) - new Date(a.dateDebut);
        }
        return 0;
    });

    const handleAccept = async (id) => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/formations/${id}`, { statut: "validé" });
            setFormations(formations.map(f => f.id === id ? { ...f, statut: "validé" } : f));
        } catch (error) {
            console.error("Erreur lors de l'acceptation de la formation :", error);
        }
    };

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

    // Formater les dates
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 sm:ml-64">
            {/* Header Section */}
            <div className="max-w-6xl mx-auto mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Gestion des Formations</h1>
                        <p className="text-gray-600 mt-1">Consultez et gérez toutes les formations validées</p>
                    </div>
                    <div className="flex space-x-2 mt-4 sm:mt-0">
                        <button 
                            onClick={() => setCurrentView('grid')} 
                            className={`p-2 rounded-lg ${currentView === 'grid' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}
                        >
                            <FaSearch className="w-5 h-5" />
                        </button>
                        <button 
                            onClick={() => setCurrentView('table')} 
                            className={`p-2 rounded-lg ${currentView === 'table' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}
                        >
                            <FaSortAmountDown className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="bg-white p-5 rounded-xl shadow-lg flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <input 
                            type="text" 
                            placeholder="Rechercher par titre..." 
                            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                    <div className="relative flex-1">
                        <select 
                            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all appearance-none"
                            value={filterLieu} 
                            onChange={(e) => setFilterLieu(e.target.value)}
                        >
                            <option value="">Tous les lieux</option>
                            {[...new Set(formations.map(f => f.lieux))].map(lieu => (
                                lieu && <option key={lieu} value={lieu}>{lieu}</option>
                            ))}
                        </select>
                        <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* Loading indicator */}
            {loading && (
                <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
                    <div className="animate-spin w-12 h-12 mx-auto border-4 border-orange-500 border-t-transparent rounded-full"></div>
                    <p className="text-gray-600 mt-4">Chargement des formations...</p>
                </div>
            )}

            {/* Grid View */}
            {!loading && currentView === 'grid' && (
                <motion.div 
                    className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {sortedFormations.length > 0 ? (
                        sortedFormations.map((f) => (
                            <motion.div 
                                key={f.id} 
                                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                                variants={itemVariants}
                            >
                                <div className="bg-orange-500 p-4 text-white">
                                    <h3 className="font-bold text-lg truncate">{f.titre}</h3>
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center mb-3 text-gray-600">
                                        <FaCalendarAlt className="mr-2 text-orange-500" />
                                        <span>Du {formatDate(f.dateDebut)} au {formatDate(f.dateFin)}</span>
                                    </div>
                                    <div className="flex items-center mb-4 text-gray-600">
                                        <FaMapMarkerAlt className="mr-2 text-orange-500" />
                                        <span>{f.lieux || "Aucun lieu spécifié"}</span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2 mt-5">
                                        <Link 
                                            to={`/DREF/formation/${f.id}`} 
                                            className="flex justify-center items-center p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-200"
                                            title="Voir les détails"
                                        >
                                            <FaEye className="mr-1" /> Voir
                                        </Link>
                                        <Link 
                                            to={`/DREF/Updatformation/${f.id}`} 
                                            className="flex justify-center items-center p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
                                            title="Modifier"
                                        >
                                            <FaEdit className="mr-1" /> Éditer
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(f.id)}
                                            className="flex justify-center items-center p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
                                            title="Supprimer"
                                        >
                                            <FaTrash className="mr-1" />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                        <Link 
                                            to={`/DREF/ajouter-formateurs/${f.id}`} 
                                            className="flex justify-center items-center p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200"
                                            title="Ajouter Formateurs"
                                        >
                                            <FaUserPlus className="mr-1" /> Formateurs
                                        </Link>
                                        <Link 
                                            to={`/DREF/ajouter-hebergement/${f.id}`} 
                                            className="flex justify-center items-center p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-200"
                                            title="Ajouter Hébergement"
                                        >
                                            <FaHotel className="mr-1"/> Hébergement
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full bg-white rounded-xl shadow-lg p-8 text-center">
                            <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-gray-500 text-lg mt-4">Aucune formation validée disponible.</p>
                            <p className="text-gray-400 mt-2">Essayez de modifier vos filtres ou revenez plus tard.</p>
                        </div>
                    )}
                </motion.div>
            )}

            {/* Table View */}
            {!loading && currentView === 'table' && (
                <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-orange-500 text-white">
                                <tr>
                                    <th className="p-4 text-left font-semibold text-sm uppercase tracking-wide cursor-pointer" onClick={() => handleSort('titre')}>
                                        <div className="flex items-center">
                                            Titre
                                            {sorting.field === 'titre' && (
                                                <span className="ml-1">{sorting.direction === 'asc' ? '↑' : '↓'}</span>
                                            )}
                                        </div>
                                    </th>
                                    <th className="p-4 text-left font-semibold text-sm uppercase tracking-wide cursor-pointer" onClick={() => handleSort('dateDebut')}>
                                        <div className="flex items-center">
                                            Période
                                            {sorting.field === 'dateDebut' && (
                                                <span className="ml-1">{sorting.direction === 'asc' ? '↑' : '↓'}</span>
                                            )}
                                        </div>
                                    </th>
                                    <th className="p-4 text-left font-semibold text-sm uppercase tracking-wide">Lieu</th>
                                    <th className="p-4 text-left font-semibold text-sm uppercase tracking-wide">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedFormations.length > 0 ? (
                                    sortedFormations.map((f) => (
                                        <tr key={f.id} className="border-b hover:bg-orange-50 transition-all duration-200">
                                            <td className="p-4 text-gray-800 font-medium">{f.titre}</td>
                                            <td className="p-4 text-gray-600">
                                                {formatDate(f.dateDebut)} - {formatDate(f.dateFin)}
                                            </td>
                                            <td className="p-4 text-gray-600">{f.lieux || "Non spécifié"}</td>
                                            <td className="p-4">
                                                <div className="flex flex-wrap gap-2">
                                                    <Link 
                                                        to={`/DREF/formation/${f.id}`} 
                                                        className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transform hover:scale-105 transition-all duration-200"
                                                        title="Voir les détails"
                                                    >
                                                        <FaEye />
                                                    </Link>
                                                    <Link 
                                                        to={`/DREF/Updatformation/${f.id}`} 
                                                        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transform hover:scale-105 transition-all duration-200"
                                                        title="Modifier"
                                                    >
                                                        <FaEdit />
                                                    </Link>
                                                    <Link 
                                                        to={`/DREF/ajouter-formateurs/${f.id}`} 
                                                        className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transform hover:scale-105 transition-all duration-200"
                                                        title="Ajouter Formateurs"
                                                    >
                                                        <FaUserPlus />
                                                    </Link>
                                                    <Link 
                                                        to={`/DREF/ajouter-hebergement/${f.id}`} 
                                                        className="p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transform hover:scale-105 transition-all duration-200"
                                                        title="Ajouter Hébergement"
                                                    >
                                                        <FaHotel />
                                                    </Link>
                                                    <button 
                                                        onClick={() => handleDelete(f.id)}
                                                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transform hover:scale-105 transition-all duration-200"
                                                        title="Supprimer"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="p-8 text-center">
                                            <svg className="w-12 h-12 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="text-gray-500 text-lg mt-4">Aucune formation validée disponible.</p>
                                            <p className="text-gray-400 mt-2">Essayez de modifier vos filtres ou revenez plus tard.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DrefFormations;