import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function PageFormateurs() {
  const [formateurs, setFormateurs] = useState([]);
  const [selectedFormateurIds, setSelectedFormateurIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFiliere, setFilterFiliere] = useState("");
  const [filterEtablissement, setFilterEtablissement] = useState("");
  const [loading, setLoading] = useState(true);
  const [animateRows, setAnimateRows] = useState(false);
  // New state for notifications
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success" // 'success', 'error', or 'warning'
  });

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
        
        // Animation des lignes au chargement
        setTimeout(() => setAnimateRows(true), 100);
      } catch (error) {
        console.error("Erreur de chargement :", error);
        setLoading(false);
        showNotification("Une erreur est survenue lors du chargement des données", "error");
      }
    };

    fetchData();
  }, [id]);

  // Custom notification handler (replaces alert)
  const showNotification = (message, type = "success") => {
    setNotification({
      show: true,
      message,
      type
    });
    
    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 5000);
  };

  const handleSelect = async (formateurId) => {
    const idAsNumber = Number(formateurId);
    const isSelected = selectedFormateurIds.includes(idAsNumber);
  
    console.log("handleSelect:", { formateurId: idAsNumber, isSelected, selectedFormateurIds, formationId: id });
  
    if (isSelected) {
      try {
        await axios.delete(
          `http://127.0.0.1:8000/api/formation-participants/${id}/${idAsNumber}`
        );
        setSelectedFormateurIds((prev) => prev.filter((id) => id !== idAsNumber));
        showNotification("Formateur désélectionné.", "success");
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        console.error("Erreur lors de la suppression :", errorMessage);
        if (error.response?.status === 404) {
          setSelectedFormateurIds((prev) => prev.filter((id) => id !== idAsNumber));
          showNotification("Formateur désélectionné localement (non trouvé dans la base).", "warning");
        } else {
          showNotification(`Erreur : ${errorMessage}`, "error");
        }
      }
    } else {
      setSelectedFormateurIds((prev) => [...prev, idAsNumber]);
      showNotification("Formateur sélectionné.", "success");
    }
  };

  const handleAddFormateurs = async () => {
    if (!id) {
      showNotification("ID de formation manquant.", "warning");
      return;
    }

    if (selectedFormateurIds.length === 0) {
      showNotification("Veuillez sélectionner au moins un formateur.", "warning");
      return;
    }

    try {
      const data = { participant_ids: selectedFormateurIds };
      await axios.post(
        `http://127.0.0.1:8000/api/formation-participants/${id}`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      showNotification("Formateurs ajoutés avec succès !", "success");
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error.response?.data || error.message);
      showNotification("Erreur : " + (error.response?.data?.message || error.message), "error");
    }
  };

  const filteredFormateurs = formateurs.filter(
    (formateur) =>
      formateur.nom.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterFiliere ? formateur.filliere === filterFiliere : true) &&
      (filterEtablissement ? formateur.etablissement === filterEtablissement : true)
  );

  // Get notification styles based on type
  const getNotificationStyles = () => {
    const baseStyles = "fixed top-6 right-6 max-w-md px-6 py-4 rounded-lg shadow-lg transform transition-all duration-500 flex items-start z-50 border-l-4";
    
    if (notification.type === "success") {
      return `${baseStyles} bg-green-50 border-green-500 text-green-700`;
    } else if (notification.type === "error") {
      return `${baseStyles} bg-red-50 border-red-500 text-red-700`;
    } else {
      return `${baseStyles} bg-yellow-50 border-yellow-500 text-yellow-700`;
    }
  };

  // Get notification icon based on type
  const getNotificationIcon = () => {
    if (notification.type === "success") {
      return (
        <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    } else if (notification.type === "error") {
      return (
        <svg className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    } else {
      return (
        <svg className="w-6 h-6 text-yellow-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6 sm:ml-64">
      {/* Modern notification system */}
      {notification.show && (
        <div 
          className={`${getNotificationStyles()} ${notification.show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
        >
          <div className="flex items-start">
            {getNotificationIcon()}
            <div className="flex-1">
              <p className="font-medium">{notification.message}</p>
            </div>
            <button 
              onClick={() => setNotification(prev => ({ ...prev, show: false }))}
              className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* En-tête de la page */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
            Gestion des Formateurs
          </h1>
          <p className="text-gray-600">
            Sélectionnez les formateurs à assigner à cette formation
          </p>
        </div>

        {/* Section de filtres */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 transform transition-all duration-300 hover:shadow-xl border-l-4 border-orange-500">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Filtres de recherche</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14.001.001A7 7 0 0121 10z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Rechercher par nom..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
            
            <div className="relative group">
              <select
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none transition-all"
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
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
            
            <div className="relative group">
              <select
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none transition-all"
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
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          </div>
        </div>

        {/* Section du tableau */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl shadow-lg p-6">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mb-4"></div>
            <p className="text-gray-600 font-medium">Chargement des données...</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                  Liste des Formateurs
                  <span className="ml-2 text-sm font-normal text-orange-500 bg-orange-100 px-2 py-1 rounded-full">
                    {filteredFormateurs.length} résultats
                  </span>
                </h2>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{selectedFormateurIds.length}</span> formateurs sélectionnés
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-orange-500 text-white">
                    <th className="px-6 py-4 text-left font-semibold">Sélection</th>
                    <th className="px-6 py-4 text-left font-semibold">ID</th>
                    <th className="px-6 py-4 text-left font-semibold">Nom</th>
                    <th className="px-6 py-4 text-left font-semibold">Prénom</th>
                    <th className="px-6 py-4 text-left font-semibold">Filière</th>
                    <th className="px-6 py-4 text-left font-semibold">Établissement</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFormateurs.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                        Aucun formateur ne correspond à vos critères de recherche
                      </td>
                    </tr>
                  ) : (
                    filteredFormateurs.map((formateur, index) => (
                      <tr
                        key={formateur.id}
                        className={`border-b hover:bg-orange-50 transition-all ${
                          selectedFormateurIds.includes(formateur.id) ? "bg-orange-50" : ""
                        } ${
                          animateRows
                            ? "opacity-100 transform translate-y-0"
                            : "opacity-0 transform translate-y-4"
                        }`}
                        style={{
                          transitionDelay: `${index * 30}ms`,
                          transitionDuration: "500ms",
                        }}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center">
                            <input
                              type="checkbox"
                              className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                              checked={selectedFormateurIds.includes(formateur.id)}
                              onChange={() => handleSelect(formateur.id)}
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700 font-medium">{formateur.id}</td>
                        <td className="px-6 py-4 text-gray-700 font-medium">{formateur.nom}</td>
                        <td className="px-6 py-4 text-gray-700">{formateur.prenom}</td>
                        <td className="px-6 py-4">
                          <span className="inline-block bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
                            {formateur.filliere}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{formateur.etablissement}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="p-6 flex justify-between items-center bg-gray-50 border-t border-gray-100">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{filteredFormateurs.length}</span> formateurs affichés sur{" "}
                <span className="font-medium">{formateurs.length}</span> au total
              </div>
              <button
                className={`px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 flex items-center ${
                  selectedFormateurIds.length === 0
                    ? "bg-orange-300 cursor-not-allowed opacity-70"
                    : "bg-orange-500 hover:bg-orange-600 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                }`}
                disabled={selectedFormateurIds.length === 0}
                onClick={handleAddFormateurs}
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Ajouter les formateurs sélectionnés
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}