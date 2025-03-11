import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function FormateursPage() {
  const [formateurs, setFormateurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFormateurs, setSelectedFormateurs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/participants")
      .then(response => {
        setFormateurs(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des formateurs :", error);
        setLoading(false);
      });
  }, []);

  const handleSelect = (id) => {
    setSelectedFormateurs(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="container mx-auto  p-4 sm:ml-64 ">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 p-4 sm:ml-64">Liste des Formateurs</h1>
      {loading ? (
        <p className="text-center text-gray-600">Chargement...</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg  p-4 sm:ml-64">
          <table className="min-w-full border-collapse w-full">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-3 px-4 text-left">Sélection</th>
                <th className="py-3 px-4 text-left">Nom</th>
                <th className="py-3 px-4 text-left">Prénom</th>
                <th className="py-3 px-4 text-left">Filière</th>
                <th className="py-3 px-4 text-left">Établissement</th>
              </tr>
            </thead>
            <tbody>
              {formateurs.map((formateur, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-4">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5" 
                      checked={selectedFormateurs.includes(formateur.id)}
                      onChange={() => handleSelect(formateur.id)}
                    />
                  </td>
                  <td className="py-2 px-4">{formateur.nom}</td>
                  <td className="py-2 px-4">{formateur.prenom}</td>
                  <td className="py-2 px-4">{formateur.filliere}</td>
                  <td className="py-2 px-4">{formateur.etablissement}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 text-right">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition">Ajouter</button>
          </div>
        </div>
      )}
    </div>
  );
}
