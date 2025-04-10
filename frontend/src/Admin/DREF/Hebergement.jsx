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
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 sm:ml-64 flex items-center justify-center">
            <div className="max-w-5xl w-full">
                {/* Filter Section */}
                <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Rechercher par nom..."
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                        </div>
                        <select
                            value={lieuTerm}
                            onChange={(e) => setLieuTerm(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                        >
                            <option value="">Tous les lieux</option>
                            {lieux.map((lieu, index) => (
                                <option key={index} value={lieu}>{lieu}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Table Section */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
                    </div>
                ) : filteredHebergements.length === 0 ? (
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center text-gray-600 text-lg">
                        Aucun hébergement trouvé.
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-orange-500 text-white">
                                    <tr>
                                        <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wide">Sélection</th>
                                        <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wide">ID</th>
                                        <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wide">Nom</th>
                                        <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wide">Lieu</th>
                                        <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wide">Localisation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredHebergements.map((hebergement) => (
                                        <tr key={hebergement.id} className="border-b hover:bg-orange-50 transition-all duration-200">
                                            <td className="py-4 px-6">
                                                <input
                                                    type="checkbox"
                                                    className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                                                    checked={selectedHebergementId === hebergement.id}
                                                    onChange={() => handleSelect(hebergement.id)}
                                                />
                                            </td>
                                            <td className="py-4 px-6 text-gray-700">{hebergement.id}</td>
                                            <td className="py-4 px-6 text-gray-800 font-medium">{hebergement.nom_hebergement}</td>
                                            <td className="py-4 px-6 text-gray-600">{hebergement.lieu}</td>
                                            <td className="py-4 px-6 text-gray-600">{hebergement.localisation}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-6 flex flex-col items-end gap-4">
                            <button
                                className={`px-6 py-3 rounded-lg text-white font-semibold transition-all duration-200 ${
                                    !selectedHebergementId
                                        ? "bg-orange-300 cursor-not-allowed"
                                        : "bg-orange-500 hover:bg-orange-600 hover:shadow-md"
                                }`}
                                disabled={!selectedHebergementId}
                                onClick={handleAddHebergement}
                            >
                                Ajouter
                            </button>
                            {message && (
                                <p
                                    className={`text-center w-full ${
                                        message.includes("Erreur") ? "text-red-600" : "text-green-600"
                                    } animate-fade-in`}
                                >
                                    {message}
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}