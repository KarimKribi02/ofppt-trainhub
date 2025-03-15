import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom'; // ✅ Ajout de useParams et Link

const AffichageFormation = () => {
  const [formationData, setFormationData] = useState(null); // ✅ Changé en null pour une seule formation
  const { id } = useParams(); // ✅ Récupère l'ID depuis l'URL

  useEffect(() => {
    fetchFormation();
  }, [id]); // ✅ Dépendance sur id

  const fetchFormation = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/formations/${id}`); // ✅ URL avec ID
      setFormationData(response.data);
    } catch (err) {
      console.error('Erreur lors de la récupération de la formation:', err);
      setFormationData(null);
    }
  };

  if (!formationData) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-700">Chargement ou formation non trouvée...</p>
          <Link 
            to="/CDC/overview"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Retour à l'overview
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 p-4 sm:ml-64">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{formationData.titre}</h1>
            <p className="text-gray-700 mb-6">{formationData.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500">Date de début</label>
                <p className="mt-1 text-gray-900">{formationData.dateDebut}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Date de fin</label>
                <p className="mt-1 text-gray-900">{formationData.dateFin}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Lieux</label>
                <p className="mt-1 text-gray-900">{formationData.lieux}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Filières</label>
                <p className="mt-1 text-gray-900">{formationData.filières}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Formateurs / Animateurs</label>
                <p className="mt-1 text-gray-900">{formationData.formateurs_animateurs}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Statut</label>
                <p className="mt-1 text-gray-900">{formationData.statut}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Mode</label>
                <p className="mt-1 text-gray-900">{formationData.mode}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Lien</label>
                <a href={formationData.lien_teams} className="mt-1 text-gray-900">{formationData.lien_teams}</a>
              </div>
            </div>

            {formationData.document && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-500">Document</label>
                <a
                  href={formationData.document}
                  download
                  className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Télécharger le document
                </a>
              </div>
            )}
          </div>
        </div>
        <Link 
          to="/CDC/overview"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Retour à l'overview
        </Link>
      </div>
    </div>
  );
};

export default AffichageFormation;