import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Hebergement() {
    const [hebergements, setHebergements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedHebergementId, setSelectedHebergementId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [lieuTerm, setLieuTerm] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchHebergements = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/hebergements");
                setHebergements(response.data.data || response.data);
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération des hébergements:", error);
                setMessage("Erreur lors du chargement des hébergements.");
                setLoading(false);
                setTimeout(() => setMessage(""), 3000);
            }
        };

        fetchHebergements();
    }, []);

    const handleSelect = (id) => {
        setSelectedHebergementId(prev => (prev === id ? null : id));
    };

    const handleAddHebergement = async () => {
        if (!selectedHebergementId) {
            setMessage("Veuillez sélectionner un hébergement.");
            setTimeout(() => setMessage(""), 3000);
            return;
        }
        if (!id) {
            setMessage("Aucune formation spécifiée dans l'URL.");
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/hebergements/assign/${id}`,
                { hebergement_id: selectedHebergementId }
            );
            setMessage("Hébergement ajouté avec succès !");
            setSelectedHebergementId(null);
            setTimeout(() => {
                setMessage("");
                navigate("/DREF/formations");
            }, 2000);
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'hébergement:", error.response?.data || error.message);
            setMessage("Erreur lors de l'ajout de l'hébergement : " + (error.response?.data?.message || error.message));
            setTimeout(() => setMessage(""), 3000);
        }
    };

    const filteredHebergements = hebergements.filter((hebergement) =>
        hebergement.nom_hebergement.toLowerCase().includes(searchTerm.toLowerCase()) &&
        hebergement.lieu.toLowerCase().includes(lieuTerm.toLowerCase())
    );

    const lieux = [...new Set(hebergements.map((hebergement) => hebergement.lieu))];

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 sm:ml-64">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800">Sélection d'Hébergement</h1>
                    <p className="text-gray-600 mt-2">Choisissez un hébergement pour votre formation</p>
                </div>

                {/* Filter Section */}
                <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 transform transition-all hover:shadow-xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                            
                            <input
                                type="text"
                                placeholder="Rechercher par nom..."
                                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </div>
                            <select
                                value={lieuTerm}
                                onChange={(e) => setLieuTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-all appearance-none bg-white"
                            >
                                <option value="">Tous les lieux</option>
                                {lieux.map((lieu, index) => (
                                    <option key={index} value={lieu}>{lieu}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="relative">
                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500 absolute top-0 left-0"></div>
                        </div>
                    </div>
                ) : filteredHebergements.length === 0 ? (
                    <div className="bg-white p-12 rounded-2xl shadow-lg text-center">
                        <svg className="w-16 h-16 text-orange-500 mx-auto mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <p className="text-gray-600 text-xl font-medium">Aucun hébergement trouvé</p>
                        <p className="text-gray-500 mt-2">Essayez de modifier vos critères de recherche</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                                        <th className="py-5 px-6 text-left font-semibold text-sm uppercase tracking-wider">Sélection</th>
                                        <th className="py-5 px-6 text-left font-semibold text-sm uppercase tracking-wider">ID</th>
                                        <th className="py-5 px-6 text-left font-semibold text-sm uppercase tracking-wider">Nom</th>
                                        <th className="py-5 px-6 text-left font-semibold text-sm uppercase tracking-wider">Lieu</th>
                                        <th className="py-5 px-6 text-left font-semibold text-sm uppercase tracking-wider">Localisation</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredHebergements.map((hebergement) => (
                                        <tr 
                                            key={hebergement.id} 
                                            className={`hover:bg-orange-50 transition-all cursor-pointer ${selectedHebergementId === hebergement.id ? 'bg-orange-100' : ''}`}
                                            onClick={() => handleSelect(hebergement.id)}
                                        >
                                            <td className="py-4 px-6">
                                                <div className="relative">
                                                    <input
                                                        type="checkbox"
                                                        className="w-5 h-5 text-orange-500 border-gray-300 rounded-full focus:ring-orange-500 cursor-pointer"
                                                        checked={selectedHebergementId === hebergement.id}
                                                        onChange={() => {}} // Event handled by row click
                                                    />
                                                    {selectedHebergementId === hebergement.id && (
                                                        <span className="absolute -right-1 -top-1 bg-orange-500 rounded-full w-3 h-3"></span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-gray-500 font-mono">{hebergement.id}</td>
                                            <td className="py-4 px-6">
                                                <div className="font-medium text-gray-800">{hebergement.nom_hebergement}</div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                                    {hebergement.lieu}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-gray-600">{hebergement.localisation}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        <div className="p-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50">
                            <div className="flex-1 w-full sm:w-auto">
                                {message && (
                                    <div className={`rounded-lg p-3 ${
                                        message.includes("Erreur") 
                                            ? "bg-red-100 text-red-700 border-l-4 border-red-500" 
                                            : "bg-green-100 text-green-700 border-l-4 border-green-500"
                                    } animate-pulse`}>
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                {message.includes("Erreur") ? (
                                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                    </svg>
                                                ) : (
                                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm">{message}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <button
                                className={`px-6 py-3 rounded-xl text-white font-medium transition-all shadow-md flex items-center ${
                                    !selectedHebergementId
                                        ? "bg-gray-400 cursor-not-allowed opacity-70"
                                        : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transform hover:-translate-y-1"
                                }`}
                                disabled={!selectedHebergementId}
                                onClick={handleAddHebergement}
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                Ajouter à la formation
                            </button>
                        </div>
                    </div>
                )}
                
                {/* Footer or Stats */}
                <div className="mt-8 text-center text-gray-500 text-sm">
                    {!loading && filteredHebergements.length > 0 && (
                        <p>Affichage de {filteredHebergements.length} hébergement(s) sur {hebergements.length} disponible(s)</p>
                    )}
                </div>
            </div>
        </div>
    );
}