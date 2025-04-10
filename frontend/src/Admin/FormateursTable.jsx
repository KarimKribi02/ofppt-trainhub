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
          axios.get(`http://127.0.0.1:8000/api/formation-participants/${id}`),
        ]);

        console.log("Réponse brute des participants :", participantsRes.data);

        const allFormateurs = formateursRes.data.data || formateursRes.data;
        const existingIds = (participantsRes.data?.participants || []).map((p) =>
          Number(p.id)
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

  const handleSelect = async (formateurId) => {
    const isSelected = selectedFormateurIds.includes(formateurId);

    if (isSelected) {
      try {
        await axios.delete(
          `http://127.0.0.1:8000/api/formation-participants/${id}/${formateurId}`
        );
        setSelectedFormateurIds((prev) => prev.filter((id) => id !== formateurId));
      } catch (error) {
        console.error("Erreur lors de la suppression :", error.response?.data || error.message);
        alert("Erreur lors de la suppression du formateur.");
      }
    } else {
      setSelectedFormateurIds((prev) => [...prev, formateurId]);
    }
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
      const data = { participant_ids: selectedFormateurIds };
      await axios.post(
        `http://127.0.0.1:8000/api/formation-participants/${id}`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      alert("Formateurs ajoutés avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error.response?.data || error.message);
      alert("Erreur : " + (error.response?.data?.message || error.message));
    }
  };

  const filteredFormateurs = formateurs.filter(
    (formateur) =>
      formateur.nom.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterFiliere ? formateur.filliere === filterFiliere : true) &&
      (filterEtablissement ? formateur.etablissement === filterEtablissement : true)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:ml-64 flex flex-col items-center">
      {/* Filter Section */}
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher par nom..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">🔍</span>
          </div>
          <select
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={filterFiliere}
            onChange={(e) => setFilterFiliere(e.target.value)}
          >
            <option value="">Toutes les filières</option>
            {[...new Set(formateurs.map((f) => f.filliere))].map((filiere) => (
              <option key={filiere} value={filiere}>
                {filiere}
              </option>
            ))}
          </select>
          <select
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={filterEtablissement}
            onChange={(e) => setFilterEtablissement(e.target.value)}
          >
            <option value="">Tous les établissements</option>
            {[...new Set(formateurs.map((f) => f.etablissement))].map((etab) => (
              <option key={etab} value={etab}>
                {etab}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Section */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
        </div>
      ) : (
        <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-orange-500 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Sélection</th>
                  <th className="px-6 py-4 text-left font-semibold">ID</th>
                  <th className="px-6 py-4 text-left font-semibold">Nom</th>
                  <th className="px-6 py-4 text-left font-semibold">Prénom</th>
                  <th className="px-6 py-4 text-left font-semibold">Filière</th>
                  <th className="px-6 py-4 text-left font-semibold">Établissement</th>
                </tr>
              </thead>
              <tbody>
                {filteredFormateurs.map((formateur) => (
                  <tr
                    key={formateur.id}
                    className="border-b hover:bg-orange-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                        checked={selectedFormateurIds.includes(formateur.id)}
                        onChange={() => handleSelect(formateur.id)}
                      />
                    </td>
                    <td className="px-6 py-4 text-gray-700">{formateur.id}</td>
                    <td className="px-6 py-4 text-gray-700">{formateur.nom}</td>
                    <td className="px-6 py-4 text-gray-700">{formateur.prenom}</td>
                    <td className="px-6 py-4 text-gray-700">{formateur.filliere}</td>
                    <td className="px-6 py-4 text-gray-700">{formateur.etablissement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 flex justify-end">
            <button
              className={`px-6 py-3 rounded-lg text-white font-semibold transition ${
                selectedFormateurIds.length === 0
                  ? "bg-orange-300 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
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