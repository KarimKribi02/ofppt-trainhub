import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function FormateursPage() {
  const [formateurs, setFormateurs] = useState([]);
  const [selectedFormateurIds, setSelectedFormateurIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFiliere, setFilterFiliere] = useState("");
  const [filterEtablissement, setFilterEtablissement] = useState("");
  const [loading, setLoading] = useState(true);

  const { id } = useParams();


    useEffect(() => {
      const fetchData = async () => {
        try {
          const [formateursRes, participantsRes] = await Promise.all([
            axios.get("http://127.0.0.1:8000/api/participants"),
            axios.get(`http://127.0.0.1:8000/api/formation-participants/${id}`)
          ]);
          
          console.log("Réponse brute des participants :", participantsRes.data);

          const allFormateurs = formateursRes.data.data || formateursRes.data;
    
          // ✅ on convertit les IDs en number (pour match dans le .includes)
          const existingIds = (participantsRes.data?.participants || []).map(
            (p) => Number(p.id)
          );
    
          console.log("Participants existants (IDs):", existingIds);
    
          setFormateurs(allFormateurs);
          setSelectedFormateurIds(existingIds);
          setLoading(false);
        } catch (error) {
          console.error("Erreur de chargement :", error);
          setLoading(false);
        }
      };
    
      fetchData();
    }, [id]);
    
  
  const handleSelect = (formateurId) => {
    setSelectedFormateurIds((prev) =>
      prev.includes(formateurId)
        ? prev.filter((id) => id !== formateurId)
        : [...prev, formateurId]
    );
  };

  const handleAddFormateurs = async () => {
    if (!id) {
      alert("ID de formation manquant.");
      return;
    }

    if (selectedFormateurIds.length === 0) {
      alert("Veuillez sélectionner au moins un formateur.");
      return;
    }

    try {
      const data = {
        participant_ids: selectedFormateurIds,
      };

      await axios.post(
        `http://127.0.0.1:8000/api/formation-participants/${id}`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      alert("Formateurs ajoutés avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error.response?.data || error.message);
      alert("Erreur : " + (error.response?.data?.message || error.message));
    }
  };

  const filteredFormateurs = formateurs.filter((formateur) =>
    formateur.nom.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterFiliere ? formateur.filliere === filterFiliere : true) &&
    (filterEtablissement ? formateur.etablissement === filterEtablissement : true)
  );
  

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4 sm:ml-64">
      <div className="mb-6 w-full bg-white p-4 shadow rounded-lg flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="🔍 Rechercher par nom..."
          className="border border-gray-300 p-2 rounded-lg w-full sm:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border border-gray-300 p-2 rounded-lg w-full sm:w-1/3"
          value={filterFiliere}
          onChange={(e) => setFilterFiliere(e.target.value)}
        >
          <option value="">Toutes les filières</option>
          {[...new Set(formateurs.map(f => f.filliere))].map((filiere) => (
            <option key={filiere} value={filiere}>
              {filiere}
            </option>
          ))}
        </select>
        <select
          className="border border-gray-300 p-2 rounded-lg w-full sm:w-1/3"
          value={filterEtablissement}
          onChange={(e) => setFilterEtablissement(e.target.value)}
        >
          <option value="">Tous les établissements</option>
          {[...new Set(formateurs.map(f => f.etablissement))].map((etab) => (
            <option key={etab} value={etab}>
              {etab}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-gray-600">Chargement...</p>
      ) : (
        <div className="w-full bg-white shadow rounded-lg overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Sélection</th>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Nom</th>
                <th className="px-4 py-2 text-left">Prénom</th>
                <th className="px-4 py-2 text-left">Filière</th>
                <th className="px-4 py-2 text-left">Établissement</th>
              </tr>
            </thead>
            <tbody>
              {filteredFormateurs.map((formateur) => (
                <tr key={formateur.id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      className="w-5 h-5"
                      checked={selectedFormateurIds.includes(formateur.id)}
                      onChange={() => handleSelect(formateur.id)}
                    />
                  </td>
                  <td className="px-4 py-2">{formateur.id}</td>
                  <td className="px-4 py-2">{formateur.nom}</td>
                  <td className="px-4 py-2">{formateur.prenom}</td>
                  <td className="px-4 py-2">{formateur.filliere}</td>
                  <td className="px-4 py-2">{formateur.etablissement}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 text-right">
            <button
              className={`bg-blue-600 text-white px-6 py-2 rounded-lg transition ${
                selectedFormateurIds.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }`}
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
