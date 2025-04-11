import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateFormation = ({ source }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    dateDebut: '',
    dateFin: '',
    lieux: '',
    filières: '',
    formateurs_animateurs: '',
    document: null,
    statut: '',
    mode: '',
    lien_teams: '',
  });
  const [animateurs, setAnimateurs] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/formations/${id}`)
      .then((response) => {
        setFormData({
          ...response.data,
          document: null, // Réinitialiser document pour éviter d'envoyer une chaîne
        });
      })
      .catch((error) => {
        console.error("Erreur lors du chargement de la formation", error);
      });

    axios.get("http://localhost:8000/api/animateurs")
      .then((response) => {
        setAnimateurs(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des animateurs", error);
      });
  }, [id]);

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

    const data = new FormData();
    data.append('titre', formData.titre);
    data.append('description', formData.description);
    data.append('dateDebut', formData.dateDebut);
    data.append('dateFin', formData.dateFin);
    data.append('lieux', formData.lieux);
    data.append('filières', formData.filières);
    data.append('formateurs_animateurs', formData.formateurs_animateurs);
    data.append('statut', formData.statut);
    data.append('mode', formData.mode);
    if (formData.lien_teams) data.append('lien_teams', formData.lien_teams);
    if (formData.document && formData.document instanceof File) {
      data.append('document', formData.document);
    }
    data.append('_method', 'PUT');

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/formations/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('🎉 Formation mise à jour avec succès');
      navigate(source === "DREF" ? "/DREF/formations" : "/CDC/overview");
    } catch (error) {
      console.error("Erreur lors de la mise à jour", error.response?.data || error.message);
      toast.error('❌ Erreur : ' + (error.response?.data.message || 'Une erreur est survenue'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(source === "DREF" ? "/DREF/formations" : "/CDC/overview");
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-blue-50 to-white p-6 sm:ml-64">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-orange-500 mb-8 flex items-center justify-center gap-2">
          <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Modifier une Formation
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Titre */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Titre</label>
              <input
                type="text"
                name="titre"
                value={formData.titre}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>

            {/* Date début */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Date de Début</label>
              <input
                type="date"
                name="dateDebut"
                value={formData.dateDebut}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring=oange-500 outline-none"
              />
            </div>

            {/* Date fin */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Date de Fin</label>
              <input
                type="date"
                name="dateFin"
                value={formData.dateFin}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>

            {/* Lieux */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Ville</label>
              <select
                name="lieux"
                value={formData.lieux}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-orange-500 outline-none"
              >
                <option value="">Sélectionner une ville</option>
                <option value="casablanca">Casablanca</option>
                <option value="rabat">Rabat</option>
                <option value="marrakech">Marrakech</option>
              </select>
            </div>

            {/* Filière */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Filière</label>
              <select
                name="filières"
                value={formData.filières}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-orange-500 outline-none"
              >
                <option value="">Sélectionner Filière</option>
                <option value="Développement Digital">Développement Digital</option>
                <option value="Génie Civil">Génie Civil</option>
              </select>
            </div>

            {/* Animateur */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Formateur / Animateur</label>
              <select
                name="formateurs_animateurs"
                value={formData.formateurs_animateurs}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-orange-500 outline-none"
              >
                <option value="">Sélectionner</option>
                {animateurs
                  .filter((a) => a.filières === formData.filières)
                  .map((a) => (
                    <option key={a.id} value={`${a.nom} ${a.prenom}`}>
                      {a.nom} {a.prenom}
                    </option>
                  ))}
              </select>
            </div>

            {/* Mode */}
            <div className="col-span-2">
              <label className="block mb-2 text-sm font-semibold text-gray-700">Mode de Formation</label>
              <div className="flex gap-4">
                {["présentiel", "à_distance", "hybride"].map((mode) => (
                  <label key={mode} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="mode"
                      value={mode}
                      checked={formData.mode === mode}
                      onChange={handleChange}
                      className="text-orange-500 focus:ring-orange-500"
                    />
                    <span>{mode === "présentiel" ? "Présentiel" : mode === "à_distance" ? "À Distance" : "Hybride"}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Lien teams si nécessaire */}
            {(formData.mode === "à_distance" || formData.mode === "hybride") && (
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-semibold text-gray-700">Lien Teams</label>
                <input
                  type="text"
                  name="lien_teams"
                  value={formData.lien_teams}
                  onChange={handleChange}
                  placeholder="https://teams.microsoft.com/..."
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
            )}

            {/* Description */}
            <div className="col-span-2">
              <label className="block mb-2 text-sm font-semibold text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>

            {/* Document */}
            <div className="col-span-2">
              <label className="block mb-2 text-sm font-semibold text-gray-700">Document de formation</label>
              <input
                type="file"
                name="document"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 bg-white"
                accept=".pdf,.doc,.docx,.ppt,.pptx"
              />
            </div>

            {/* Statut */}
            <div className="col-span-2">
              <label className="block mb-2 text-sm font-semibold text-gray-700">Statut</label>
              <div className="flex gap-6">
                {["redigé", "validé"].map((s) => (
                  <label key={s} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="statut"
                      value={s}
                      checked={formData.statut === s}
                      onChange={handleChange}
                      className="text-orange-500 focus:ring-orange-500"
                    />
                    <span className="capitalize">{s}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition disabled:bg-orange-400"
            >
              {isSubmitting ? 'Mise à jour en cours...' : 'Mettre à jour'}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={true} closeOnClick pauseOnHover />
    </div>
  );
};

export default UpdateFormation;