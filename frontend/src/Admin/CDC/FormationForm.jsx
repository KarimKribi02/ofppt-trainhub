import React, { useState } from 'react';
import axios from 'axios'

const FormationForm = () => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    dateDebut: '',
    dateFin: '',
    region: '',
    lieux: '',
    document: null,
    image: null,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Utilisation de FormData pour gérer les fichiers

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

      const res = await axios.post('http://127.0.0.1:8000/api/formations', data);

      if (res.data.status === 200) {
        console.log('Formation ajoutée:', res.data.message);
        setFormData({
          titre: '',
          description: '',
          dateDebut: '',
          dateFin: '',
          statut: 'en attente',
          region: '',
          lieux: '',
          document: null,
          image: null,
        });
      
      }
  
  };

  const handleCancel = () => {
    setFormData({
      titre: '',
      description: '',
      dateDebut: '',
      dateFin: '',
      region: '',
      lieux: '',
      document: null,
      image: null,
    });
  };

  return (
    
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 sm:ml-64">
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
              <label htmlFor="region" className="block text-sm font-medium mb-1">Région</label>
              <select
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Sélectionner une région</option>
                <option value="tanger-tetouan-al-hoceima">Tanger-Tétouan-Al Hoceïma</option>
                <option value="oriental">L'Oriental</option>
                <option value="fes-meknes">Fès-Meknès</option>
                <option value="rabat-sale-kenitra">Rabat-Salé-Kénitra</option>
                <option value="beni-mellal-khenifra">Béni Mellal-Khénifra</option>
                <option value="casablanca-settat">Casablanca-Settat</option>
                <option value="marrakech-safi">Marrakech-Safi</option>
                <option value="draa-tafilalet">Drâa-Tafilalet</option>
                <option value="souss-massa">Souss-Massa</option>
                <option value="guelmim-oued-noun">Guelmim-Oued Noun</option>
                <option value="laayoune-sakia-el-hamra">Laâyoune-Sakia El Hamra</option>
                <option value="dakhla-ouzr">Dakhla-Oued Ed-Dahab</option>
              </select>
            </div>


            <div className="mb-4">
              <label htmlFor="lieux" className="block text-sm font-medium mb-1">Ville</label>
              <select
                id="lieux"
                name="lieux"
                value={formData.lieux}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Sélectionner une ville</option>
                <option value="casablanca">Casablanca</option>
                <option value="rabat">Rabat</option>
                <option value="marrakech">Marrakech</option>
                <option value="fes">Fès</option>
                <option value="tanger">Tanger</option>
                <option value="agadir">Agadir</option>
                <option value="meknes">Meknès</option>
                <option value="oujda">Oujda</option>
                <option value="kenitra">Kénitra</option>
                <option value="tetouan">Tétouan</option>
                <option value="safi">Safi</option>
                <option value="el-jadida">El Jadida</option>
                <option value="nador">Nador</option>
                <option value="beni-mellal">Béni Mellal</option>
                <option value="taza">Taza</option>
                <option value="settat">Settat</option>
                <option value="mohammedia">Mohammédia</option>
                <option value="khemisset">Khémisset</option>
                <option value="guelmim">Guelmim</option>
                <option value="errachidia">Errachidia</option>
                <option value="laayoune">Laâyoune</option>
                <option value="dakhla">Dakhla</option>
              </select>
            </div>


            <div className="mb-4">
              <label htmlFor="document" className="block text-sm font-medium mb-1">Document de Formation</label>
              <input
                type="file"
                id="document"
                name="document"
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="image" className="block text-sm font-medium mb-1">Image</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="flex justify-center space-x-2 mt-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
                onClick={handleCancel}
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
