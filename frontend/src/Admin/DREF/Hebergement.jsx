import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Hebergement() {
    const [hebergements, setHebergements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedHebergementId, setSelectedHebergementId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [lieuTerm, setLieuTerm] = useState(""); // New state for lieu filter

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://127.0.0.1:8000/api/hebergements")
            .then((response) => {
                setHebergements(response.data.data || response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching hebergements:", error);
                setLoading(false);
            });
    }, []);

    const handleSelect = (id) => {
        setSelectedHebergementId(prev => (prev === id ? null : id));
    };

    const filteredHebergements = hebergements.filter(hebergement =>
        hebergement.nom_hebergement.toLowerCase().includes(searchTerm.toLowerCase()) &&
        hebergement.lieu.toLowerCase().includes(lieuTerm.toLowerCase())
    );

    // Get all unique 'lieu' values for the select dropdown
    const lieux = [...new Set(hebergements.map(hebergement => hebergement.lieu))];

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4 sm:ml-64">
            <div className="mb-6 flex flex-wrap gap-4 items-center bg-white p-4 shadow-md rounded-lg w-full">
                <input 
                    type="text" 
                    placeholder="🔍 Rechercher par nom..." 
                    className="border border-gray-300 p-2 rounded-lg w-full sm:w-1/4 focus:ring-2 focus:ring-blue-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select 
                    value={lieuTerm}
                    onChange={(e) => setLieuTerm(e.target.value)}
                    className="border border-gray-300 p-2 rounded-lg w-full sm:w-1/4 focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">Select par lieu...</option>
                    {lieux.map((lieu, index) => (
                        <option key={index} value={lieu}>{lieu}</option>
                    ))}
                </select>
            </div>
            {loading ? (
                <p className="text-center text-gray-600">Chargement...</p>
            ) : (
                <div className="w-full bg-white shadow-lg rounded-lg">
                    <table className="min-w-full border-collapse w-full">
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
                                            type="radio"
                                            name="hebergement"
                                            className="w-5 h-5"
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
                            className={`bg-blue-600 text-white px-6 py-2 rounded-lg shadow transition ${!selectedHebergementId ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                            disabled={!selectedHebergementId}
                        >
                            Ajouter
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
