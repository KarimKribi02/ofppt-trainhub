import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AffichageFormation = () => {
  const [formationData, setFormationData] = useState([]);

  useEffect(() => {
    fetchFormations();
  }, []);

  const fetchFormations = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/formations');
      setFormationData(response.data);
    } catch (err) {
      console.error('Erreur lors de la récupération des formations:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {formationData.map((formation) => (
          <div key={formation.id} className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{formation.titre}</h1>
              <p className="text-gray-700 mb-6">{formation.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Date de début</label>
                  <p className="mt-1 text-gray-900">{formation.dateDebut}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Date de fin</label>
                  <p className="mt-1 text-gray-900">{formation.dateFin}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Lieux</label>
                  <p className="mt-1 text-gray-900">{formation.lieux}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Filières</label>
                  <p className="mt-1 text-gray-900">{formation.filières}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Formateurs / Animateurs</label>
                  <p className="mt-1 text-gray-900">{formation.formateurs_animateurs}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Statut</label>
                  <p className="mt-1 text-gray-900">{formation.statut}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Mode</label>
                  <p className="mt-1 text-gray-900">{formation.mode}</p>
                </div>
              </div>

              {formation.document && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-500">Document</label>
                  <a
                    href={formation.document}
                    download
                    className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Télécharger le document
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default AffichageFormation;
