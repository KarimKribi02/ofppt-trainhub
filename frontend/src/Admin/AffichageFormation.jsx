import React from 'react';

const AffichageFormation = () => {
  const formationData = {
    titre: 'Formation en Développement Web',
    description: 'Cette formation couvre les bases du développement web moderne, y compris HTML, CSS, JavaScript et React.',
    dateDebut: '2023-10-01',
    dateFin: '2023-10-15',
    region: 'Île-de-France',
    lieux: 'Paris',
    filières: 'Informatique',
    formateurs_animateurs: 'Jean Dupont, Marie Curie',
    document: 'https://example.com/path/to/document.pdf',
    statut: 'Ouvert',
    mode: 'En ligne',
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
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
              <label className="block text-sm font-medium text-gray-500">Région</label>
              <p className="mt-1 text-gray-900">{formationData.region}</p>
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
    </div>
  );
};

export default AffichageFormation;