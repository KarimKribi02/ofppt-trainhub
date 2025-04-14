import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const GestionANIMATEUR = () => {
  const [animateurs, setanimateurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    filières: '',
  });
  const [showForm, setShowForm] = useState(false);

  const fetchanimateurs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/animateurs');
      console.log('API Response:', response.data);
      setanimateurs(Array.isArray(response.data) ? response.data : []);
      setError(null);
    } catch (err) {
      console.error('Error:', err.response || err);
      setError('Erreur lors du chargement des animateurs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchanimateurs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/animateurs', formData);
      setFormData({ nom: '', prenom: '', email: '', password: '', filières: '' });
      setShowForm(false);
      fetchanimateurs();
      alert('Animateur ajouté avec succès !');
    } catch (err) {
      setError('Erreur lors de l\'ajout de l\'animateur.');
      console.error('Erreur:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cet animateur ?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/animateurs/${id}`);
        fetchanimateurs();
      } catch (err) {
        console.error('Erreur lors de la suppression:', err);
        setError('Erreur lors de la suppression.');
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <div className="bg-orange-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8 p-4 sm:ml-64">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8 md:flex md:items-center md:justify-between">
          <motion.div
            className="flex-1 min-w-0"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold leading-7 text-orange-900 sm:text-3xl sm:leading-9 sm:truncate">
              Gestion des Animateurs
            </h2>
            <p className="mt-1 text-sm text-orange-700">
              Gérez tous vos animateurs en un seul endroit
            </p>
          </motion.div>
          <motion.div
            className="mt-4 flex md:mt-0 md:ml-4"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.button
              type="button"
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {showForm ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                )}
              </svg>
              {showForm ? 'Annuler' : 'Nouvel Animateur'}
            </motion.button>
          </motion.div>
        </div>

        {/* Form */}
        {showForm && (
          <motion.div
            className="bg-white shadow-lg rounded-lg mb-8 overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-gradient-to-r from-orange-500 to-orange-400 px-4 py-4">
              <h3 className="text-lg font-medium text-white">Ajouter un nouvel animateur</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                      Nom
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="nom"
                        id="nom"
                        required
                        value={formData.nom}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                        placeholder="Nom"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
                      Prénom
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="prenom"
                        id="prenom"
                        required
                        value={formData.prenom}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                        placeholder="Prénom"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Adresse e-mail
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                        placeholder="exemple@domaine.com"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Mot de passe
                    </label>
                    <div className="mt-1">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="filières" className="block text-sm font-medium text-gray-700">
                      Filière
                    </label>
                    <div className="mt-1">
                      <select
                        id="filières"
                        name="filières"
                        value={formData.filières}
                        onChange={handleChange}
                        required
                        className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                      >
                        <option value="">Sélectionnez une filière</option>
                        <option value="Développement Digital">Développement Digital</option>
                        <option value="Génie Civil">Génie Civil</option>
                        <option value="Infrastructure Digitale">Infrastructure Digitale</option>
                        <option value="Gestion des Entreprises">Gestion des Entreprises</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <motion.button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Annuler
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="bg-orange-500 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Enregistrer
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        )}

        {/* Error Display */}
        {error && (
          <motion.div
            className="bg-red-50 border-l-4 border-red-400 p-4 mb-8 rounded-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Table */}
        <motion.div
          className="flex flex-col "
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow-lg rounded-lg overflow-hidden border border-orange-100">
                {loading ? (
                  <div className="bg-white px-4 py-12 text-center">
                    <div className="flex justify-center items-center">
                      <svg
                        className="animate-spin h-8 w-8 text-orange-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Chargement des animateurs...</p>
                  </div>
                ) : animateurs.length === 0 ? (
                  <div className="bg-white px-4 py-12 text-center">
                    <svg
                      className="mx-auto h-16 w-16 text-orange-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Aucun animateur</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Commencez par ajouter un nouvel animateur.
                    </p>
                    <motion.button
                      type="button"
                      onClick={() => setShowForm(true)}
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Créer un animateur
                    </motion.button>
                  </div>
                ) : (
                  <div>
                    <div className="bg-gradient-to-r from-orange-500 to-orange-400 px-4 py-3">
                      <h3 className="text-lg font-medium text-white">Liste des Animateurs</h3>
                    </div>
                    <table className="min-w-full divide-y divide-orange-100">
                      <thead className="bg-orange-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider"
                          >
                            ID
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider"
                          >
                            Nom
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider"
                          >
                            Prénom
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider"
                          >
                            Adresse e-mail
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider"
                          >
                            Filière
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-orange-100">
                        {animateurs.map((animateur) => (
                          <motion.tr
                            key={animateur.id}
                            variants={itemVariants}
                            whileHover={{ backgroundColor: '#fff7ed' }}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{animateur.id}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{animateur.nom}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{animateur.prenom}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500 truncate max-w-xs">
                                {animateur.email}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{animateur.filières || 'Non spécifié'}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                              <button
                                onClick={() => handleDelete(animateur.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Supprimer
                              </button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GestionANIMATEUR;