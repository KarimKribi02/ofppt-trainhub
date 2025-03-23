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

<<<<<<< HEAD
    const handleAddHebergement = () => {
        if (!selectedHebergementId) return;

        axios.put(`http://127.0.0.1:8000/api/formations/${selectedHebergementId}`)
            .then(() => {
                setMessage("Hébergement ajouté avec succès !");
                setTimeout(() => setMessage(""), 3000);
            })
            .catch(() => {
                setMessage("Erreur lors de l'ajout de l'hébergement.");
                setTimeout(() => setMessage(""), 3000);
            });
=======
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
                {
                    hebergement_id: selectedHebergementId,
                }
            );
            setMessage("Hébergement ajouté avec succès !");
            setSelectedHebergementId(null);
            setTimeout(() => {
                setMessage("");
                navigate("/CDC/overview");
            }, 2000);
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'hébergement:", error.response?.data || error.message);
            setMessage("Erreur lors de l'ajout de l'hébergement : " + (error.response?.data?.message || error.message));
            setTimeout(() => setMessage(""), 3000);
        }
>>>>>>> 9d776f5806d3fe9b757d342d74e42459bc6e2a9c
    };

    const filteredHebergements = hebergements.filter((hebergement) =>
        hebergement.nom_hebergement.toLowerCase().includes(searchTerm.toLowerCase()) &&
        hebergement.lieu.toLowerCase().includes(lieuTerm.toLowerCase())
    );

    const lieux = [...new Set(hebergements.map((hebergement) => hebergement.lieu))];

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4 sm:ml-64">
            <div className="mb-6 flex flex-wrap gap-4 items-center bg-white p-4 shadow-md rounded-lg w-full">
                <input
                    type="text"
                    placeholder="🔍 Rechercher par nom..."
                    className="border border-gray-300 p-2 rounded-lg w-full sm:w-1/4 focus:ring-2 focus:ring-blue-400 outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    value={lieuTerm}
                    onChange={(e) => setLieuTerm(e.target.value)}
                    className="border border-gray-300 p-2 rounded-lg w-full sm:w-1/4 focus:ring-2 focus:ring-blue-400 outline-none"
                >
                    <option value="">Tous les lieux</option>
                    {lieux.map((lieu, index) => (
                        <option key={index} value={lieu}>{lieu}</option>
                    ))}
                </select>
            </div>

            {loading ? (
                <p className="text-center text-gray-600">Chargement...</p>
            ) : filteredHebergements.length === 0 ? (
                <p className="text-center text-gray-600">Aucun hébergement trouvé.</p>
            ) : (
                <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="py-3 px-4 text-left">Sélection</th>
                                <th className="py-3 px-4 text-left">ID</th>
                                <th className="py-3 px-4 text-left">Nom</th>
                                <th className="py-3 px-4 text-left">Lieu</th>
                                <th className="py-3 px-4 text-left">Localisation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredHebergements.map((hebergement) => (
                                <tr key={hebergement.id} className="border-b hover:bg-gray-100">
                                    <td className="py-2 px-4">
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                                            checked={selectedHebergementId === hebergement.id}
                                            onChange={() => handleSelect(hebergement.id)}
                                        />
                                    </td>
                                    <td className="py-2 px-4">{hebergement.id}</td>
                                    <td className="py-2 px-4">{hebergement.nom_hebergement}</td>
                                    <td className="py-2 px-4">{hebergement.lieu}</td>
                                    <td className="py-2 px-4">{hebergement.localisation}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4 text-right p-4">
                        <button
                            className={`bg-blue-600 text-white px-6 py-2 rounded-lg shadow transition ${
                                !selectedHebergementId ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                            }`}
                            disabled={!selectedHebergementId}
                            onClick={handleAddHebergement}
                        >
                            Ajouter
                        </button>
                        {message && (
                            <p
                                className={`text-center mt-2 ${
                                    message.includes("Erreur") ? "text-red-600" : "text-green-600"
                                }`}
                            >
                                {message}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}