import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function FormateursPage() {
  const [formateurs, setFormateurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFormateurIds, setSelectedFormateurIds] = useState([]); // Tableau d'IDs
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFiliere, setFilterFiliere] = useState("");
  const [filterEtablissement, setFilterEtablissement] = useState("");
  const { id } = useParams(); // ID de la formation depuis l'URL
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/participants") // Endpoint corrigé
      .then(response => {
        setFormateurs(response.data.data || response.data); // Ajustez selon la structure de la réponse
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des formateurs :", error);
        setLoading(false);
      });
  }, []);

  const handleSelect = (id) => {
    setSelectedFormateurIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    ); // Ajouter ou retirer un ID du tableau
  };

  const handleAddFormateurs = async () => {
    if (!id) {
      console.error("L'ID de la formation est manquant.");
      alert("Impossible d'ajouter des formateurs sans ID de formation.");
      return;
    }

    if (selectedFormateurIds.length === 0) {
      alert("Veuillez sélectionner au moins un formateur.");
      return;
    }

    console.log("Données envoyées :", { participant_ids: selectedFormateurIds });

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/formations/${id}`,
        { participant_ids: selectedFormateurIds } // Envoyer un tableau d'IDs
      );
      alert("Formateurs ajoutés avec succès !");
      setSelectedFormateurIds([]); // Réinitialiser la sélection
      navigate(`/CDC/overview`);
    } catch (error) {
      console.error("Erreur lors de l'ajout des formateurs :", error.response?.data || error.message);
      alert("Une erreur s'est produite lors de l'ajout des formateurs.");
    }
  };

  const filteredFormateurs = formateurs.filter(formateur =>
    formateur.nom.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterFiliere ? formateur.filliere === filterFiliere : true) &&
    (filterEtablissement ? formateur.etablissement === filterEtablissement : true)
  );

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
          className="border border-gray-300 p-2 rounded-lg w-full sm:w-1/3 focus:ring-2 focus:ring-blue-400" 
          value={filterFiliere} 
          onChange={(e) => setFilterFiliere(e.target.value)}
        >
          <option value="">Toutes les filières</option>
          {[...new Set(formateurs.map(f => f.filliere))].map(filiere => (
            <option key={filiere} value={filiere}>{filiere}</option>
          ))}
        </select>
        <select 
          className="border border-gray-300 p-2 rounded-lg w-full sm:w-1/3 focus:ring-2 focus:ring-blue-400" 
          value={filterEtablissement} 
          onChange={(e) => setFilterEtablissement(e.target.value)}
        >
          <option value="">Tous les établissements</option>
          {[...new Set(formateurs.map(f => f.etablissement))].map(etablissement => (
            <option key={etablissement} value={etablissement}>{etablissement}</option>
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
                <th className="py-3 px-4 text-left">Prénom</th>
                <th className="py-3 px-4 text-left">Filière</th>
                <th className="py-3 px-4 text-left">Établissement</th>
              </tr>
            </thead>
            <tbody>
              {filteredFormateurs.map((formateur, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-4">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5" 
                      checked={selectedFormateurIds.includes(formateur.id)}
                      onChange={() => handleSelect(formateur.id)}
                    />
                  </td>
                  <td className="py-2 px-4">{formateur.id}</td>
                  <td className="py-2 px-4">{formateur.nom}</td>
                  <td className="py-2 px-4">{formateur.prenom}</td>
                  <td className="py-2 px-4">{formateur.filliere}</td>
                  <td className="py-2 px-4">{formateur.etablissement}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 text-right p-4">
            <button 
              className={`bg-blue-600 text-white px-6 py-2 rounded-lg shadow transition ${selectedFormateurIds.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`} 
              disabled={selectedFormateurIds.length === 0}
              onClick={handleAddFormateurs}
            >
              Ajouter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}