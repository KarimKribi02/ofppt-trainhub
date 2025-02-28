import React, { useState } from 'react';

const FormationForm = () => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    dateDebut: '',
    dateFin: '',
    statut: '',
    region: '',
    lieux: '',
    document: null,
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0]
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // FormData pour envoyer des fichiers
    axios.post('http://127.0.0.1:8000/api/formations', formData)
      .then(response => {
        console.log('Formation ajoutée:', response.data);
        // Réinitialiser le formulaire après ajout
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout de la formation:', error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-3xl w-full bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-6 text-center">Ajouter Formation</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="mb-4">
              <label htmlFor="titre" className="block text-sm font-medium mb-1">Titre</label>
              <input
                type="text"
                id="titre"
                name="titre"
                value={formData.titre}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="dateDebut" className="block text-sm font-medium mb-1">Date de Début</label>
              <input
                type="date"
                id="dateDebut"
                name="dateDebut"
                value={formData.dateDebut}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="dateFin" className="block text-sm font-medium mb-1">Date de Fin</label>
              <input
                type="date"
                id="dateFin"
                name="dateFin"
                value={formData.dateFin}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="statut" className="block text-sm font-medium mb-1">Statut</label>
              <input
                type="text"
                id="statut"
                name="statut"
                value={formData.statut}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="region" className="block text-sm font-medium mb-1">Région</label>
              <select
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Sélectionner une région</option>
                {/* Options de région ici */}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="lieux" className="block text-sm font-medium mb-1">Lieux</label>
              <input
                type="text"
                id="lieux"
                name="lieux"
                value={formData.lieux}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="document" className="block text-sm font-medium mb-1">Document de Formation</label>
              <input
                type="file"
                id="document"
                name="document"
                onChange={handleFileChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="image" className="block text-sm font-medium mb-1">Image</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="flex justify-center space-x-2 mt-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Add Formation
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormationForm;
