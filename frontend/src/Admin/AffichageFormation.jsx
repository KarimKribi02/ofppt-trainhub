import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const AffichageFormation = () => {
  const [formationData, setFormationData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchFormation();
  }, [id]);

  const fetchFormation = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/formations/${id}`);
      setFormationData(response.data);
    } catch (err) {
      console.error('Erreur lors de la récupération de la formation:', err);
      setFormationData(null);
    }
  };

  if (!formationData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4">
        <div className="text-center bg-white p-8 rounded-xl shadow-md max-w-md w-full">
          <p className="text-lg text-gray-600 mb-6 animate-pulse">Chargement ou formation non trouvée...</p>
          <Link
            to="/CDC/overview"
            className="inline-flex items-center px-6 py-2.5 rounded-full bg-orange-500 text-white font-medium hover:bg-orange-600 transform hover:scale-105 transition-all duration-300"
          >
            Retour à l'overview
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 sm:ml-64">
      <div className="max-w-3xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 transform transition-all hover:shadow-xl">
          <div className="bg-orange-500 p-6 text-white">
            <h1 className="text-3xl font-extrabold tracking-tight">{formationData.titre}</h1>
          </div>
          <div className="p-6">
            <p className="text-gray-600 text-lg italic leading-relaxed">{formationData.description}</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {[
            { label: 'Date de début', value: formationData.dateDebut },
            { label: 'Date de fin', value: formationData.dateFin },
            { label: 'Lieux', value: formationData.lieux },
            { label: 'Filières', value: formationData.filières },
            { label: 'Formateurs / Animateurs', value: formationData.formateurs_animateurs },
            { label: 'Statut', value: formationData.statut },
            { label: 'Mode', value: formationData.mode },
            { label: 'Lien', value: formationData.lien_teams, isLink: true },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
            >
              <span className="block text-sm font-semibold text-orange-500 uppercase tracking-wider">
                {item.label}
              </span>
              {item.isLink ? (
                <a
                  href={item.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block text-gray-800 hover:text-orange-600 transition-colors"
                >
                  {item.value}
                </a>
              ) : (
                <span className="mt-1 block text-gray-800 font-medium">{item.value}</span>
              )}
            </div>
          ))}
        </div>

        {/* Document Download */}
        {formationData.document && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">
            <span className="block text-sm font-semibold text-orange-500 uppercase tracking-wider">
              Document
            </span>
            <a
              href={formationData.document}
              download
              className="mt-3 inline-flex items-center px-5 py-2.5 rounded-full bg-orange-500 text-white font-medium hover:bg-orange-600 transform hover:scale-105 transition-all duration-300"
            >
              Télécharger
            </a>
          </div>
        )}

        {/* Back Button */}
        <div className="text-center">
          <Link
            to="/CDC/overview"
            className="inline-flex items-center px-6 py-2.5 rounded-full bg-orange-500 text-white font-medium hover:bg-orange-600 transform hover:scale-105 transition-all duration-300"
          >
            Retour à l'overview
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AffichageFormation;