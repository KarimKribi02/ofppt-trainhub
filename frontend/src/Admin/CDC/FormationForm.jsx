import React, { useState , useEffect } from 'react';
import axios from 'axios'

const FormationForm = () => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    dateDebut: '',
    dateFin: '',
    lieux: '',
    filières: '',
    formateurs_animateurs : '',
    document: null,
    statut: '',
    mode: '',
  });
  const [animateurs, setAnimateurs] = useState([]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/animateurs")
      .then((response) => {
        setAnimateurs(response.data);
        
      })
      .catch((error) => {
        console.log("Erreur lors du chargement des animateurs");
        
      });
  }, []);


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
          lieux: '',
          filières: '',
          formateurs_animateurs : '',
          document: null,
          statut: '',
          mode: '',
        });
      
      }
  
  };

  const handleCancel = () => {
    setFormData({
          titre: '',
          description: '',
          dateDebut: '',
          dateFin: '',
          lieux: '',
          filières: '',
          formateurs_animateurs : '',
          document: null,
          statut: '',
          mode: '',
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
            <div className='mb-4'>
              <label htmlFor="filière" className="block text-sm font-medium mb-1">Filières :</label>
              <select
                id="filières"
                name="filières"
                value={formData.filières}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Sélectionner  Filière </option>
                <option value="Développement Digital">Développement Digital</option>
                <option value="Génie Civil ">Génie Civil </option>
                <option value="Infrastructure Digitale">Infrastructure Digitale</option>
                <option value="Gestion des Entreprises">Gestion des Entreprises</option>
              
              </select>
            </div>
            <div className='mb-4'>
              <label htmlFor="formateurs_animateurs" className="block text-sm font-medium mb-1">Formateurs Animateurs :</label>
              <select
                id="formateurs_animateurs"
                name="formateurs_animateurs"
                value={formData.formateurs_animateurs}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Sélectionner Formateurs Animateurs </option>
                {animateurs
                .filter((animateur) => animateur.filliere === formData.filières)
                .map((animateur) => (
                  <option key={animateur.id} value={animateur.formateur.nom + " " + animateur.formateur.prenom}>
                    {animateur.formateur.nom + " " + animateur.formateur.prenom}
                  </option>
                ))}

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
           <div className='mb-4'>
            <label htmlFor="mode" className="block text-sm font-medium mb-1">Mode de Formation :</label>
            <div class="flex items-center ps-4 border border-gray-200 rounded-sm dark:border-gray-700">
                <input id="presentiel" type="radio" value={formData.mode} name="bordered-checkbox" onChange={handleChange} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label for="presentiel" class="w-full py-4 ms-2 text-sm font-medium text-gray-900 ">Presentiel</label>
            </div>
            <div class="flex items-center ps-4 border border-gray-200 rounded-sm dark:border-gray-700">
                <input id="à_distance" type="radio" value={formData.mode} name="bordered-checkbox" onChange={handleChange} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label for="à_distance" class="w-full py-4 ms-2 text-sm font-medium text-gray-900">à Distance</label>
            </div>
            </div>
           <div className='mb-4'>
            <label htmlFor="mode" className="block text-sm font-medium mb-1">Statut de Formation :</label>
            <div class="flex items-center ps-4 border border-gray-200 rounded-sm dark:border-gray-700">
                <input id="redigé" type="radio" value={formData.statut} name="bordered-checkboxe" onChange={handleChange} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label for="redigé" class="w-full py-4 ms-2 text-sm font-medium text-gray-900 ">Redigé</label>
            </div>
            <div class="flex items-center ps-4 border border-gray-200 rounded-sm dark:border-gray-700">
                <input id="validé" type="radio" value={formData.statut} name="bordered-checkboxe" onChange={handleChange} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label for="validé" class="w-full py-4 ms-2 text-sm font-medium text-gray-900">Validé</label>
            </div>
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
